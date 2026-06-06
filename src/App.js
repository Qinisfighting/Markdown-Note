import "./App.css";
import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
//import {data} from "./data"
import Split from "react-split";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function App() {
  //When the app first loads, initialize the notes state with the notes saved in localStorage
  //when the array is empty, returns[] instead undefined as an error.
  //'() =>'is a lazy State initialization function that ensures react to reach to localstorage only at the firsttime when app loads
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(true);

  React.useEffect(() => {
    const savedNotes = notes.filter((note) => note.body.trim() !== "");
    localStorage.setItem("notes", JSON.stringify(savedNotes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "",
      isLocked: false,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((note) =>
        note.id === currentNoteId ? { ...note, body: text } : note
      )
    );
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  function toggleLock(noteId) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, isLocked: !note.isLocked } : note
      )
    );
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split
          key={isSidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}
          sizes={isSidebarCollapsed ? [0, 100] : [30, 70]}
          minSize={isSidebarCollapsed ? [48, 0] : [180, 300]}
          gutterSize={isSidebarCollapsed ? 0 : 10}
          direction="horizontal"
          className="split"
        >
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
            toggleLock={toggleLock}
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={() =>
              setIsSidebarCollapsed((prevCollapsed) => !prevCollapsed)
            }
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <button className="first-note" onClick={createNewNote}>
            <p>
              CREATE A NOTE{" "}
              <FontAwesomeIcon
                icon={icon({
                  name: "marker",
                  family: "classic",
                  style: "solid",
                })}
              />
            </p>
          </button>
        </div>
      )}
    </main>
  );
}
