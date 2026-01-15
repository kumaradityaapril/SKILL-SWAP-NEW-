import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import SessionButton from "../components/SessionButton";

const LearnerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, accepted, rejected

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/requests/learner");
        setRequests(res.data);
        
        // Mark notifications as read when viewing requests
        await api.patch("/requests/notifications/mark-read");
      } catch (err) {
        alert("Failed to load your requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true;
    return req.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "rejected":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your requests...</p>
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
            to="/learner/dashboard"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2 animate-fadeInUp">My Requests</h1>
          <p className="text-indigo-100 animate-fadeInUp delay-200">
            Track your learning requests and their status
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md p-2 mb-8 flex gap-2 animate-fadeInUp delay-300">
          {["all", "pending", "accepted", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold capitalize transition ${
                filter === status
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
              <span className="ml-2 text-sm">
                ({status === "all" ? requests.length : requests.filter((r) => r.status === status).length})
              </span>
            </button>
          ))}
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {filter === "all" ? "No requests yet" : `No ${filter} requests`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === "all" 
                ? "Start exploring skills and send requests to mentors"
                : `You don't have any ${filter} requests`
              }
            </p>
            {filter === "all" && (
              <Link
                to="/skills"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Explore Skills
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredRequests.map((req, index) => (
              <div
                key={req._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {req.skill.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Mentor: <span className="font-medium">{req.mentor.name}</span></span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(req.status)}`}>
                    {getStatusIcon(req.status)}
                    <span className="capitalize">{req.status}</span>
                  </div>
                </div>

                {req.message && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Your Message:</p>
                    <p className="text-gray-600">{req.message}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Sent on {new Date(req.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {req.status === "accepted" && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-green-600 font-medium">
                        🎉 Accepted!
                      </span>
                      <SessionButton requestId={req._id} userRole="learner" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnerRequests;
