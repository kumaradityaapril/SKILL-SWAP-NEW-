import { Link } from "react-router-dom";

const Home = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* NAVIGATION BAR */}
      <nav className="absolute top-0 left-0 right-0 z-50 animate-fadeInDown">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            SkillSwap
          </Link>
          <div className="flex gap-6 items-center">
            <button
              onClick={scrollToFeatures}
              className="text-white hover:text-indigo-100 transition font-medium"
            >
              Features
            </button>
            <Link
              to="/login"
              className="text-white hover:text-indigo-100 transition font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float delay-300"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-32 pt-40 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-fadeInUp">
            Share Skills, Learn Together
          </h1>

          <p className="text-lg md:text-xl text-indigo-50 max-w-3xl mx-auto mb-12 leading-relaxed animate-fadeInUp delay-200">
            Connect with others to exchange knowledge and grow your abilities in a supportive community
          </p>

          <Link
            to="/register"
            className="inline-block bg-white text-indigo-600 font-semibold px-10 py-4 rounded-full shadow-2xl hover:bg-indigo-50 hover:scale-105 transition-all duration-300 animate-fadeInUp delay-400"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE SKILLSWAP */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-indigo-600 mb-4 animate-fadeInUp">
            Why Choose SkillSwap?
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-16 animate-scaleIn delay-200"></div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-indigo-100 animate-fadeInUp delay-300">
              <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Peer-to-Peer Learning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Learn directly from peers and mentors instead of passive content consumption. Real connections, real growth.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100 animate-fadeInUp delay-400">
              <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Multi-Domain Skills
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Share or learn skills in coding, music, academics, design, languages, and more. Endless possibilities await.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-indigo-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-pink-100 animate-fadeInUp delay-500">
              <div className="w-14 h-14 bg-pink-600 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Structured & Secure
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Role-based access, mentor approval, and request tracking ensure safe and organized collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            How SkillSwap Works
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-16"></div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Create a Skill</h3>
              <p className="text-gray-600 leading-relaxed">
                Mentors list the skills they want to share along with details, tags, and availability schedules.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Send Requests</h3>
              <p className="text-gray-600 leading-relaxed">
                Learners explore skills and send mentorship requests with personalized messages to connect.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Learn & Collaborate
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Mentors approve requests and learning begins through meaningful collaboration and knowledge sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Platform Features
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-16"></div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Role-Based Access</h4>
              <p className="text-sm text-gray-600">Separate dashboards for mentors and learners</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Image Uploads</h4>
              <p className="text-sm text-gray-600">Cloudinary integration for skill images</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Request Management</h4>
              <p className="text-sm text-gray-600">Track and manage learning requests</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Skill Tags</h4>
              <p className="text-sm text-gray-600">Organize and discover skills easily</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-indigo-100">Skills Shared</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-indigo-100">Active Mentors</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">200+</div>
              <div className="text-indigo-100">Learning Connections</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Built for Curious Learners & Passionate Mentors
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Whether you are a student, a professional, or a lifelong learner — SkillSwap helps you grow by learning together in a collaborative environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/skills"
              className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-full hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg font-semibold"
            >
              Explore Skills
            </Link>
            <Link
              to="/register"
              className="inline-block bg-white text-indigo-600 border-2 border-indigo-600 px-10 py-4 rounded-full hover:bg-indigo-50 hover:scale-105 transition-all duration-300 font-semibold"
            >
              Join Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
