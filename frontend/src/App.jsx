import NoteForm from "./components/notesForm.jsx";
import NotesList from "./components/notesLists.jsx";
import { useState,setReloadFlag } from "react";
import './App.css'
function App() {
  const [reloadFlag, setReloadFlag] = useState(false);
  const reload = () => setReloadFlag(!reloadFlag);

  return (
    <div>
      <h1>Quick Notes App</h1>
      <NoteForm onNoteCreated={reload} />
      <NotesList key={reloadFlag} />
    </div>
  );
}

export default App;
