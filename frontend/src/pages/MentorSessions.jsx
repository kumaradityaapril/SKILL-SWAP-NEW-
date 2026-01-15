import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const MentorSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get("/sessions/mentor");
        setSessions(res.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        alert("Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const getSessionStatus = (scheduledDate, duration) => {
    const now = new Date();
    const sessionDate = new Date(scheduledDate);
    const sessionEndTime = new Date(sessionDate.getTime() + duration * 60000);
    const diffMinutes = (sessionDate - now) / (1000 * 60);

    // Check if session has completely ended
    if (now > sessionEndTime) {
      return { label: "Completed", color: "bg-green-100 text-green-700 border-green-200" };
    } else if (diffMinutes < 0) {
      return { label: "In Progress", color: "bg-yellow-100 text-yellow-700 border-yellow-200" };
    } else if (diffMinutes < 30) {
      return { label: "Starting Soon", color: "bg-orange-100 text-orange-700 border-orange-200" };
    } else {
      return { label: "Scheduled", color: "bg-blue-100 text-blue-700 border-blue-200" };
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", { 
        weekday: "short", 
        year: "numeric", 
        month: "short", 
        day: "numeric" 
      }),
      time: date.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit" 
      }),
    };
  };

  const handleJoinSession = (roomId) => {
    navigate(`/session/${roomId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/mentor/dashboard"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2 animate-fadeInUp">My Sessions</h1>
          <p className="text-indigo-100 animate-fadeInUp delay-200">
            View and join your scheduled mentoring sessions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {sessions.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No sessions yet</h3>
            <p className="text-gray-600 mb-6">
              Sessions will appear here once learners book them
            </p>
            <Link
              to="/mentor/requests"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              View Requests
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {sessions.map((session, index) => {
              const status = getSessionStatus(session.scheduledDate, session.duration);
              const { date, time } = formatDateTime(session.scheduledDate);
              const now = new Date();
              const sessionDate = new Date(session.scheduledDate);
              const sessionEndTime = new Date(sessionDate.getTime() + session.duration * 60000);
              const sessionEnded = now > sessionEndTime;
              const canJoin = (now >= new Date(sessionDate.getTime() - 15 * 60000)) && !sessionEnded;

              return (
                <div
                  key={session._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {session.skill.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Learner: <span className="font-medium">{session.learner.name}</span></span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span>{session.learner.email}</span>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Session Details */}
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-semibold">Date</span>
                      </div>
                      <p className="text-gray-800 font-medium">{date}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-semibold">Time</span>
                      </div>
                      <p className="text-gray-800 font-medium">{time}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm font-semibold">Duration</span>
                      </div>
                      <p className="text-gray-800 font-medium">{session.duration} minutes</p>
                    </div>
                  </div>

                  {/* Session Notes */}
                  {session.notes && (
                    <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                      <p className="text-sm font-semibold text-indigo-900 mb-1">Session Notes:</p>
                      <p className="text-indigo-700">{session.notes}</p>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex justify-end">
                    {sessionEnded ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold">Session Completed</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleJoinSession(session.roomId)}
                        disabled={!canJoin}
                        className={`px-6 py-3 rounded-lg transition font-semibold flex items-center gap-2 ${
                          canJoin
                            ? "bg-indigo-600 text-white hover:bg-indigo-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        title={canJoin ? "Join session" : "Available 15 minutes before session"}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {canJoin ? "Join Session" : "Join Session"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorSessions;
