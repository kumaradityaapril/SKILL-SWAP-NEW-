import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const CreateSkill = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [availability, setAvailability] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("availability", availability);
      formData.append("image", image);

      await api.post("/skills", formData);

      alert("Skill created successfully!");
      navigate("/mentor/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 animate-fadeInDown">
          <Link
            to="/mentor/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Skill</h1>
          <p className="text-gray-600">Share your expertise with learners</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeInUp delay-200">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Title */}
            <div className="animate-fadeInUp delay-300">
              <label className="block text-gray-700 font-semibold mb-2">
                Skill Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Guitar Lessons for Beginners"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Description */}
            <div className="animate-fadeInUp delay-400">
              <label className="block text-gray-700 font-semibold mb-2">
                Description *
              </label>
              <textarea
                placeholder="Describe what you'll teach and what learners will gain..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
              />
            </div>

            {/* Tags */}
            <div className="animate-fadeInUp delay-500">
              <label className="block text-gray-700 font-semibold mb-2">
                Tags
              </label>
              <input
                type="text"
                placeholder="e.g. music, guitar, beginner (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <p className="text-sm text-gray-500 mt-2">
                Separate tags with commas to help learners find your skill
              </p>
            </div>

            {/* Availability */}
            <div className="animate-fadeInUp delay-600">
              <label className="block text-gray-700 font-semibold mb-2">
                Availability
              </label>
              <input
                type="text"
                placeholder="e.g. Weekends, Evenings after 6 PM"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Image Upload */}
            <div className="animate-fadeInUp delay-700">
              <label className="block text-gray-700 font-semibold mb-2">
                Skill Image *
              </label>
              
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 animate-fadeInUp delay-700"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Skill...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Skill
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSkill;
