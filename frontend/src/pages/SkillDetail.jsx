import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const SkillDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const sendRequest = async () => {
    try {
      setSending(true);
      await api.post("/requests", {
        skillId: skill._id,
        message,
      });
      alert("Request sent successfully");
      setMessage("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send request");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await api.get(`/skills/${id}`);
        setSkill(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load skill");
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading skill...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-red-600 text-lg font-semibold">{error}</p>
          <Link to="/skills" className="inline-block mt-4 text-indigo-600 hover:text-indigo-700">
            ← Back to Skills
          </Link>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <p className="text-gray-600 text-lg">Skill not found</p>
          <Link to="/skills" className="inline-block mt-4 text-indigo-600 hover:text-indigo-700">
            ← Back to Skills
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/skills")}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Skills
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Skill Image */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeInUp">
          <div className="relative h-96">
            <img
              src={skill.image?.url}
              alt={skill.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">{skill.title}</h1>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="font-semibold">{skill.mentor.name}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Description */}
            <div className="mb-8 animate-fadeInUp delay-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About this Skill</h2>
              <p className="text-gray-600 leading-relaxed">{skill.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 animate-fadeInUp delay-300">
              {/* Tags */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tags && skill.tags.length > 0 ? (
                    skill.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No tags</span>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Availability
                </h3>
                <p className="text-gray-600">
                  {skill.availability || "Not specified"}
                </p>
              </div>
            </div>

            {/* Request Section */}
            {user && user.role !== "mentor" && (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border-2 border-indigo-100 animate-fadeInUp delay-400">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Interested in Learning?
                </h3>
                <p className="text-gray-600 mb-6">
                  Send a request to {skill.mentor.name} to start your learning journey!
                </p>
                
                <textarea
                  placeholder="Write a message to the mentor (optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 resize-none"
                />
                
                <button
                  onClick={sendRequest}
                  disabled={sending}
                  className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Request Mentor
                    </>
                  )}
                </button>
              </div>
            )}

            {!user && (
              <div className="bg-gray-50 p-8 rounded-2xl text-center animate-fadeInUp delay-400">
                <p className="text-gray-600 mb-4">Please login to request this skill</p>
                <Link
                  to="/login"
                  className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;
