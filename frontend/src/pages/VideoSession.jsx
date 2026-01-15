import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import SimplePeer from "simple-peer";
import api from "../services/api";

const VideoSession = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socketRef = useRef();
  const peerRef = useRef();
  const userStream = useRef();

  useEffect(() => {
    // Check if session was already ended
    const sessionEnded = localStorage.getItem(`session_ended_${roomId}`);
    if (sessionEnded === 'true') {
      alert("This session has already ended. You cannot rejoin.");
      navigate("/");
      return;
    }

    // Fetch session details
    const fetchSession = async () => {
      try {
        const res = await api.get(`/sessions/room/${roomId}`);
        
        // Check if session is already completed
        if (res.data.status === 'completed') {
          alert("This session has already been completed.");
          navigate("/");
          return;
        }
        
        setSession(res.data);
        setLoading(false);
      } catch (error) {
        alert("Session not found or you don't have access");
        navigate("/");
      }
    };

    fetchSession();
  }, [roomId, navigate]);

  useEffect(() => {
    if (!session) return;

    console.log("Initializing video session for room:", roomId);

    // Initialize socket connection - connect to backend server directly
    const socketUrl = import.meta.env.VITE_API_URL 
      ? import.meta.env.VITE_API_URL.replace('/api', '') 
      : "http://localhost:5000";
    
    console.log("Connecting to socket:", socketUrl);
    socketRef.current = io(socketUrl);

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    // Get user media
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log("Got user media stream");
        userStream.current = stream;
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }

        // Join room with user ID
        const userId = session._id;
        console.log("Joining room:", roomId, "with userId:", userId);
        socketRef.current.emit("join-room", roomId, userId);

        // Handle user connected
        socketRef.current.on("user-connected", (connectedUserId) => {
          console.log("User connected:", connectedUserId);
          setConnected(true);
          callPeer(connectedUserId, stream);
        });

        // Handle receiving call
        socketRef.current.on("offer", (offer) => {
          console.log("Received offer");
          setConnected(true);
          answerCall(offer, stream);
        });

        // Handle answer
        socketRef.current.on("answer", (answer) => {
          console.log("Received answer");
          if (peerRef.current) {
            peerRef.current.signal(answer);
          }
        });

        // Handle ICE candidate
        socketRef.current.on("ice-candidate", (candidate) => {
          console.log("Received ICE candidate");
          if (peerRef.current) {
            peerRef.current.signal(candidate);
          }
        });

        // Handle chat messages
        socketRef.current.on("chat-message", (msg) => {
          setChatMessages((prev) => [...prev, msg]);
        });

        // Handle user disconnected
        socketRef.current.on("user-disconnected", (userId) => {
          console.log("User disconnected:", userId);
          setConnected(false);
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = null;
          }
        });
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
        alert("Please allow camera and microphone access");
      });

    // Handle browser close/refresh - warn user
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave? The session will end.";
      return e.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      console.log("Cleaning up video session");
      window.removeEventListener("beforeunload", handleBeforeUnload);
      
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (userStream.current) {
        userStream.current.getTracks().forEach((track) => track.stop());
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [session, roomId]);

  const callPeer = (userId, stream) => {
    console.log("Calling peer:", userId);
    const peer = new SimplePeer({
      initiator: true,
      trickle: true,
      stream,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478' }
        ]
      }
    });

    peer.on("signal", (data) => {
      console.log("Sending offer");
      socketRef.current.emit("offer", roomId, data);
    });

    peer.on("stream", (partnerStream) => {
      console.log("Received partner stream");
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = partnerStream;
      }
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });

    peerRef.current = peer;
  };

  const answerCall = (offer, stream) => {
    console.log("Answering call");
    const peer = new SimplePeer({
      initiator: false,
      trickle: true,
      stream,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478' }
        ]
      }
    });

    peer.on("signal", (data) => {
      console.log("Sending answer");
      socketRef.current.emit("answer", roomId, data);
    });

    peer.on("stream", (partnerStream) => {
      console.log("Received partner stream");
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = partnerStream;
      }
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });

    peer.signal(offer);
    peerRef.current = peer;
  };

  const toggleMute = () => {
    if (userStream.current) {
      const audioTrack = userStream.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (userStream.current) {
      const videoTrack = userStream.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socketRef.current) {
      const msg = {
        text: message,
        sender: session.mentor._id === session._id ? "Mentor" : "Learner",
        timestamp: new Date().toISOString(),
      };
      socketRef.current.emit("chat-message", roomId, msg);
      setMessage("");
    }
  };

  const endCall = async () => {
    try {
      // Mark session as completed in backend
      await api.patch(`/sessions/${session._id}/status`, { status: 'completed' });
      
      // Mark session as ended in localStorage to prevent rejoin
      localStorage.setItem(`session_ended_${roomId}`, 'true');
    } catch (error) {
      console.error("Error updating session status:", error);
    }
    
    // Stop all media tracks
    if (userStream.current) {
      userStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    
    // Close peer connection
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    
    // Disconnect socket
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    
    // Determine user role and navigate to appropriate page
    if (session) {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const isMentor = currentUser && session.mentor._id === currentUser._id;
      
      if (isMentor) {
        navigate("/mentor/sessions");
      } else {
        navigate("/learner/requests");
      }
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{session.skill.title}</h1>
            <p className="text-sm text-gray-400">
              {connected ? "Connected" : "Waiting for other participant..."}
            </p>
          </div>
          <button
            onClick={endCall}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition"
          >
            End Call
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-3 space-y-4">
            {/* Partner Video */}
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
              <video
                ref={partnerVideo}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {!connected && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-400">Waiting for participant...</p>
                  </div>
                </div>
              )}
            </div>

            {/* User Video (Small) */}
            <div className="relative">
              <video
                ref={userVideo}
                autoPlay
                muted
                playsInline
                className="w-64 h-48 object-cover rounded-xl border-2 border-gray-700"
              />
              <div className="absolute bottom-4 left-4 bg-gray-800/80 px-3 py-1 rounded-full text-sm">
                You
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <button
                onClick={toggleMute}
                className={`p-4 rounded-full transition ${
                  isMuted ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMuted ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  )}
                </svg>
              </button>

              <button
                onClick={toggleVideo}
                className={`p-4 rounded-full transition ${
                  isVideoOff ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-gray-800 rounded-2xl p-4 flex flex-col h-[600px]">
            <h3 className="font-bold mb-4">Chat</h3>
            
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-indigo-400">{msg.sender}</p>
                  <p className="text-sm">{msg.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSession;
