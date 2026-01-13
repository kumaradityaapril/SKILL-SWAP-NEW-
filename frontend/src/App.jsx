import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Skills from "./pages/Skills";
import CreateSkill from "./pages/CreateSkill";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Skills />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-skill" element={<CreateSkill />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
