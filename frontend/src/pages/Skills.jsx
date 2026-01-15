import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [availability, setAvailability] = useState("");
  const [loading, setLoading] = useState(true);
 
  const navigate = useNavigate();
  const limit = 6;

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await api.get("/skills", {
        params: {
          search,
          tag,
          availability,
          page,
          limit,
        },
      });

      setSkills(res.data.skills);
      setPages(res.data.pages);
    } catch (error) {
      console.error("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [search, tag, availability, page]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4 animate-fadeInUp">Explore Skills</h1>
          <p className="text-indigo-100 text-lg animate-fadeInUp delay-200">
            Discover amazing skills shared by talented mentors
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 animate-fadeInUp delay-300">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Search Skills
              </label>
              <input
                type="text"
                placeholder="e.g. Guitar, Java, Maths"
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏷️ Filter by Tag
              </label>
              <input
                type="text"
                placeholder="e.g. music, coding, school"
                value={tag}
                onChange={(e) => {
                  setPage(1);
                  setTag(e.target.value);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Availability
              </label>
              <input
                type="text"
                placeholder="e.g. weekends, evenings"
                value={availability}
                onChange={(e) => {
                  setPage(1);
                  setAvailability(e.target.value);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading skills...</p>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No skills found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <div
                key={skill._id}
                onClick={() => navigate(`/skills/${skill._id}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={skill.image?.url}
                    alt={skill.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                    {skill.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {skill.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {skill.mentor.name}
                    </span>
                  </div>

                  {skill.tags && skill.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skill.tags.slice(0, 3).map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                      {skill.tags.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          +{skill.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 animate-fadeIn">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <span className="text-gray-700 font-medium">
              Page {page} of {pages}
            </span>

            <button
              disabled={page === pages}
              onClick={() => setPage(page + 1)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
