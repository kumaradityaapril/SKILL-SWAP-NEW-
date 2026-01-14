import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Skills from "./pages/Skills";
import CreateSkill from "./pages/CreateSkill";
import SkillDetail from "./pages/SkillDetail";
import MentorRequests from "./pages/MentorRequests";
import LearnerRequests from "./pages/LearnerRequests";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Skills />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-skill" element={<CreateSkill />} />
        <Route path="/skills/:id" element={<SkillDetail />} />
        <Route path="/mentor/requests" element={<MentorRequests />} />
        <Route path="/learner/requests" element={<LearnerRequests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
