import { useState } from "react";
import api from "../services/api";

const CreateSkill = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("image", image);

      await api.post("/skills", formData);

      alert("Skill created successfully");
      setTitle("");
      setDescription("");
      setTags("");
      setImage(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Create Skill</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submitHandler}>
        <input
          placeholder="Skill Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Skill Description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input
          type="file"
          required
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Skill"}
        </button>
      </form>
    </div>
  );
};

export default CreateSkill;
