import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>

        <button
          className="delete-btn"
          onClick={(event) => props.deleteNote(event, note.id)} //pass parameters (event to event, note.id to noteId) in deleteNote function in App.js
        >
          <FontAwesomeIcon
            icon={icon({ name: "trash" })}
            className={`title ${
              note.id === props.currentNote.id ? "selected-note-icon" : ""
            }`}
          />
        </button>
        <button
          className="delete-btn"
          onClick={(event) => props.deleteNote(event, note.id)} //pass parameters (event to event, note.id to noteId) in deleteNote function in App.js
        >
          <FontAwesomeIcon
            icon={icon({ name: "lock" })}
            className={`title ${
              note.id === props.currentNote.id ? "selected-note-icon" : ""
            }`}
          />

          {/* <FontAwesomeIcon
            icon={icon({ name: "lock-open" })}
            style={{
              color: "white",
              fontSize: "13px",
              marginLeft: "8px",
              cursor: "pointer",
            }}
          /> */}
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>
          Notes{" "}
          {/* <FontAwesomeIcon
            icon={icon({ name: "clipboard" })}
            style={{ color: "gray", fontSize: "21px" }}
          /> */}
        </h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
