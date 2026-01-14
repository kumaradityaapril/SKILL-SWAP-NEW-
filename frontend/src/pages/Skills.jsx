import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [availability, setAvailability] = useState("");
 
  const navigate = useNavigate();


  const limit = 6;

  const fetchSkills = async () => {
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
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [search, tag, page]);

  return (
    <div style={{ maxWidth: "1000px", margin: "30px auto" }}>
      <h2>Explore Skills</h2>

      {/* 🔍 Search by Title */}
      <input
        type="text"
        placeholder="Search skills (e.g. Guitar, Java, Maths)"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      {/* 🏷 Filter by Tag (GENERIC) */}
      <input
        type="text"
        placeholder="Filter by tag (e.g. music, coding, school)"
        value={tag}
        onChange={(e) => {
          setPage(1);
          setTag(e.target.value);
        }}
        style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
      />
      <input
  type="text"
  placeholder="Availability (e.g. weekends, evenings)"
  value={availability}
  onChange={(e) => {
    setPage(1);
    setAvailability(e.target.value);
  }}
  style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
/>


      {/* 📦 Skills Grid */}
      {skills.length === 0 ? (
        <p>No skills found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {skills.map((skill) => (
            <div
              key={skill._id}
              onClick={() => navigate(`/skills/${skill._id}`)}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              <img
                src={skill.image?.url}
                alt={skill.title}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />

              <h3>{skill.title}</h3>
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
            </div>
          ))}
        </div>
      )}

      {/* 📄 Pagination */}
      {pages > 1 && (
        <div style={{ marginTop: "25px", textAlign: "center" }}>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            style={{ marginRight: "10px" }}
          >
            Prev
          </button>

          <span>
            Page {page} of {pages}
          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
            style={{ marginLeft: "10px" }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Skills;
