import { useEffect, useState } from "react";
import api from "../services/api";

const MentorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/requests/mentor");
        setRequests(res.data);
      } catch (err) {
        alert("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Loading requests...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2>Incoming Requests</h2>

      {requests.length === 0 ? (
        <p>No requests yet</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <p>
              <strong>Skill:</strong> {req.skill.title}
            </p>
            <p>
              <strong>Learner:</strong> {req.learner.name} (
              {req.learner.email})
            </p>
            <p>
              <strong>Message:</strong>{" "}
              {req.message || "No message"}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MentorRequests;
