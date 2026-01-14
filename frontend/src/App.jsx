import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Skills from "./pages/Skills";
import CreateSkill from "./pages/CreateSkill";
import SkillDetail from "./pages/SkillDetail";
import MentorRequests from "./pages/MentorRequests";
import LearnerRequests from "./pages/LearnerRequests";
import ProtectedRoute from "./routes/ProtectedRoute";
import MentorDashboard from "./pages/MentorDashboard";
import LearnerDashboard from "./pages/LearnerDashboard";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Skills */}
        <Route path="/skills" element={<Skills />} />
        <Route path="/skills/:id" element={<SkillDetail />} />

        {/* Create Skill */}
        <Route path="/create-skill" element={<CreateSkill />} />

        {/* Requests */}
        <Route path="/mentor/requests" element={<MentorRequests />} />
        <Route path="/learner/requests" element={<LearnerRequests />} />

        {/* Dashboards */}
        <Route
          path="/mentor/dashboard"
          element={
            <ProtectedRoute role="mentor">
              <MentorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learner/dashboard"
          element={
            <ProtectedRoute role="learner">
              <LearnerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
