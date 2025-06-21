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

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function getFormattedTimestamp() {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const yy = String(now.getFullYear()).slice(-2);
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const sec = String(now.getSeconds()).padStart(2, "0");

    return `${dd}.${mm}.${yy}-${hh}:${min}:${sec}`;
  }

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: `${getFormattedTimestamp()} `,
      isLocked: false,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    const updatedTimestamp = getFormattedTimestamp();
    setNotes((oldNotes) =>
      oldNotes.map((note) => {
        if (note.id !== currentNoteId) return note;
        // pull off just the title, rebuild the first line…
        const lines = text.split("\n");
        const match = lines[0].match(
          /^(\d{2}\.\d{2}\.\d{2}-\d{2}:\d{2}:\d{2})(.*)$/
        );
        const titlePart = match ? match[2].trimStart() : lines[0];
        const newFirstLine = `${updatedTimestamp} ${titlePart}`;
        const newBody = [newFirstLine, ...lines.slice(1)].join("\n");
        return { ...note, body: newBody };
      })
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
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
            toggleLock={toggleLock}
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
