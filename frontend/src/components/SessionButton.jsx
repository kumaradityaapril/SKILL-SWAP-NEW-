import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const SessionButton = ({ requestId, userRole }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeUntilSession, setTimeUntilSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const endpoint = userRole === "mentor" ? "/sessions/mentor" : "/sessions/learner";
        const res = await api.get(endpoint);
        
        // Find session for this request
        const foundSession = res.data.find(s => s.request === requestId);
        setSession(foundSession);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [requestId, userRole]);

  useEffect(() => {
    if (!session) return;

    const updateTimeUntilSession = () => {
      const now = new Date();
      const sessionDate = new Date(session.scheduledDate);
      const diffMinutes = (sessionDate - now) / (1000 * 60);
      setTimeUntilSession(diffMinutes);
    };

    updateTimeUntilSession();
    const interval = setInterval(updateTimeUntilSession, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [session]);

  const handleJoinSession = () => {
    if (session) {
      // Check if session was already ended
      const sessionEnded = localStorage.getItem(`session_ended_${session.roomId}`);
      if (sessionEnded === 'true' || session.status === 'completed') {
        alert("This session has already ended. You cannot rejoin.");
        return;
      }
      
      navigate(`/session/${session.roomId}`);
    }
  };

  const handleBookSession = () => {
    navigate(`/session/book/${requestId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  // No session booked yet - show Book button (learner only)
  if (!session && userRole === "learner") {
    return (
      <button
        onClick={handleBookSession}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Book Session
      </button>
    );
  }

  // No session booked - mentor waiting
  if (!session && userRole === "mentor") {
    return (
      <span className="text-sm text-gray-500 italic">
        Waiting for learner to book session
      </span>
    );
  }

  // Session booked - show join button or completion status
  if (session) {
    const now = new Date();
    const sessionDate = new Date(session.scheduledDate);
    const sessionEndTime = new Date(sessionDate.getTime() + session.duration * 60000);
    
    // Check if session is marked as completed
    const isCompleted = session.status === 'completed' || localStorage.getItem(`session_ended_${session.roomId}`) === 'true';
    
    const canJoin = timeUntilSession !== null && timeUntilSession <= 15 && !isCompleted; // Can join 15 minutes before
    const sessionEnded = now > sessionEndTime || isCompleted; // Session has completely ended

    const formatTimeUntil = () => {
      if (timeUntilSession === null) return "";
      
      if (timeUntilSession < 0 && !sessionEnded) {
        return "Session in progress";
      } else if (timeUntilSession < 60) {
        return `Starts in ${Math.round(timeUntilSession)} min`;
      } else if (timeUntilSession < 1440) {
        const hours = Math.floor(timeUntilSession / 60);
        return `Starts in ${hours} hour${hours > 1 ? 's' : ''}`;
      } else {
        const days = Math.floor(timeUntilSession / 1440);
        return `Starts in ${days} day${days > 1 ? 's' : ''}`;
      }
    };

    const formatSessionDate = () => {
      const date = new Date(session.scheduledDate);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    // Session has ended - show completion status
    if (sessionEnded) {
      return (
        <div className="flex items-center gap-2 text-green-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm">
            <p className="font-semibold">Completed</p>
            <p className="text-xs text-gray-500">{formatSessionDate()}</p>
          </div>
        </div>
      );
    }

    // Session is upcoming or in progress
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm">
          <p className="font-semibold text-gray-700">{formatTimeUntil()}</p>
          <p className="text-xs text-gray-500">{formatSessionDate()}</p>
        </div>
        <button
          onClick={handleJoinSession}
          disabled={!canJoin}
          className={`px-6 py-2 rounded-lg transition font-semibold flex items-center gap-2 ${
            canJoin
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          title={canJoin ? "Join session" : "Available 15 minutes before session"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {canJoin ? "Join Now" : "Join Session"}
        </button>
      </div>
    );
  }

  return null;
};

export default SessionButton;
