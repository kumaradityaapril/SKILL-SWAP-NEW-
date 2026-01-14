import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";


const SkillDetail = () => {
  const { id } = useParams();
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

  if (loading) return <p>Loading skill...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!skill) return <p>Skill not found</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <img
        src={skill.image?.url}
        alt={skill.title}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />

      <h2>{skill.title}</h2>
      <p>{skill.description}</p>

      <p>
        <strong>Mentor:</strong> {skill.mentor.name}
      </p>

      <p>
        <strong>Tags:</strong>{" "}
        {skill.tags && skill.tags.length > 0
          ? skill.tags.join(", ")
          : "None"}
      </p>

      <p>
        <strong>Availability:</strong>{" "}
        {skill.availability || "Not specified"}
      </p>

      {user && user.role !== "mentor" && (
        <div style={{ marginTop: "20px" }}>
          <textarea
            placeholder="Message to mentor (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
          
          <button
            onClick={sendRequest}
            disabled={sending}
            style={{ marginTop: "10px" }}
          >
            {sending ? "Sending..." : "Request Mentor"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillDetail;
