import { useEffect, useState } from "react";
import api from "../services/api";

const LearnerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/requests/learner");
        setRequests(res.data);
      } catch (err) {
        alert("Failed to load your requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Loading your requests...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2>My Requests</h2>

      {requests.length === 0 ? (
        <p>You haven’t sent any requests yet</p>
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
              <strong>Mentor:</strong> {req.mentor.name}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    req.status === "accepted"
                      ? "green"
                      : req.status === "rejected"
                      ? "red"
                      : "orange",
                }}
              >
                {req.status}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default LearnerRequests;
