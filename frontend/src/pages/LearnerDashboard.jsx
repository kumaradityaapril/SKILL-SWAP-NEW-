import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import Navbar from "../components/Navbar";

const LearnerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    activeRequests: 0,
    skillsLearning: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch learner's requests
        const requestsRes = await api.get("/requests/learner");
        
        const pendingCount = requestsRes.data.filter(
          (req) => req.status === "pending"
        ).length;
        
        const acceptedCount = requestsRes.data.filter(
          (req) => req.status === "accepted"
        ).length;

        setStats({
          activeRequests: pendingCount,
          skillsLearning: acceptedCount,
          completed: 0, // You can add completed sessions logic later
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm mb-1">Active Requests</p>
                <p className="text-3xl font-bold">{loading ? "..." : stats.activeRequests}</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Skills Learning</p>
                <p className="text-3xl font-bold">{loading ? "..." : stats.skillsLearning}</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm mb-1">Completed</p>
                <p className="text-3xl font-bold">{loading ? "..." : stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              to="/skills"
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-500 dark:border-gray-700 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition">
                  <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Explore Skills</h3>
                  <p className="text-gray-600 dark:text-gray-400">Browse available skills and find mentors to learn from</p>
                </div>
              </div>
            </Link>

            <Link
              to="/learner/requests"
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 dark:border-gray-700 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center group-hover:bg-purple-600 transition">
                  <svg className="w-7 h-7 text-purple-600 dark:text-purple-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">My Requests</h3>
                  <p className="text-gray-600 dark:text-gray-400">View and manage your learning requests</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Recent Activity</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading activity...</p>
              </div>
            ) : stats.activeRequests === 0 && stats.skillsLearning === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">No recent activity</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Start exploring skills to begin your learning journey!</p>
                <Link
                  to="/skills"
                  className="inline-block mt-6 px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  Explore Skills
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.activeRequests > 0 && (
                  <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{stats.activeRequests} Pending Request{stats.activeRequests !== 1 ? 's' : ''}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Waiting for mentor response</p>
                      </div>
                    </div>
                    <Link to="/learner/requests" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold">
                      View →
                    </Link>
                  </div>
                )}
                {stats.skillsLearning > 0 && (
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{stats.skillsLearning} Active Learning Session{stats.skillsLearning !== 1 ? 's' : ''}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Currently learning</p>
                      </div>
                    </div>
                    <Link to="/learner/requests" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold">
                      View →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnerDashboard;
