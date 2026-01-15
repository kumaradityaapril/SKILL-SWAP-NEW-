import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import SessionButton from "../components/SessionButton";

const MentorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [processingId, setProcessingId] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/requests/mentor");
      setRequests(res.data);
      
      // Mark notifications as read when viewing requests
      await api.patch("/requests/notifications/mark-read");
    } catch (err) {
      alert("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (requestId, status) => {
    try {
      setProcessingId(requestId);
      await api.patch(`/requests/${requestId}`, { status });
      
      // Update local state
      setRequests(requests.map(req => 
        req._id === requestId ? { ...req, status } : req
      ));
      
      alert(`Request ${status} successfully!`);
    } catch (error) {
      alert(error.response?.data?.message || `Failed to ${status} request`);
    } finally {
      setProcessingId(null);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading requests...</p>
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
          <h1 className="text-4xl font-bold mb-2 animate-fadeInUp">Incoming Requests</h1>
          <p className="text-indigo-100 animate-fadeInUp delay-200">
            Manage learning requests from students
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
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No {filter} requests</h3>
            <p className="text-gray-600">
              {filter === "all" ? "You haven't received any requests yet" : `No ${filter} requests found`}
            </p>
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
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="font-medium">{req.learner.name}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span>{req.learner.email}</span>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </div>

                {req.message && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Message:</p>
                    <p className="text-gray-600">{req.message}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Action Buttons - Only show for pending requests */}
                  {req.status === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleStatusUpdate(req._id, "accepted")}
                        disabled={processingId === req._id}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition font-semibold flex items-center gap-2"
                      >
                        {processingId === req._id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Accept
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(req._id, "rejected")}
                        disabled={processingId === req._id}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition font-semibold flex items-center gap-2"
                      >
                        {processingId === req._id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Status Message for accepted/rejected */}
                  {req.status === "accepted" && (
                    <SessionButton requestId={req._id} userRole="mentor" />
                  )}

                  {req.status === "rejected" && (
                    <div className="flex items-center gap-2 text-red-600 font-semibold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Request Rejected
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

export default MentorRequests;
