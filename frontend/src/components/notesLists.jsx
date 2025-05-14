import { useEffect, useState } from "react";
import API from "../api";

export default function NotesList() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes-list">
      <h2 className="empty-msg">All Notes</h2>
      {notes.map(note => (
        <div key={note._id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <small>{note.tags.join(", ")}</small>
          <button onClick={() => deleteNote(note._id)} className="note-delete">Delete</button>
        </div>
      ))}
    </div>
  );
}
