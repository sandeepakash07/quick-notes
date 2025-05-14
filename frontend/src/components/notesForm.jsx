import { useState } from "react";
import API from "../api";

export default function NoteForm({ onNoteCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/notes", {
        title,
        content,
        tags: tags.split(",").map(tag => tag.trim())
      });
      onNoteCreated(); // refresh notes
      setTitle("");
      setContent("");
      setTags("");
    } catch (err) {
      alert("Failed to add note");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
      <button type="submit">Add Note</button>
    </form>
  );
}
