import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Sidebar(props) {
  if (props.isCollapsed) {
    return (
      <section className="pane sidebar sidebar--collapsed">
        <button
          className="sidebar-toggle"
          onClick={props.toggleSidebar}
          aria-label="Expand sidebar"
          title="Expand sidebar"
        >
          <FontAwesomeIcon icon={icon({ name: "angles-right" })} />
        </button>
      </section>
    );
  }

  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>

        {!note.isLocked && (
          <button
            className="delete-btn"
            onClick={(event) => props.deleteNote(event, note.id)}
          >
            <FontAwesomeIcon
              icon={icon({ name: "trash" })}
              className={`title ${
                note.id === props.currentNote.id ? "selected-note-icon" : ""
              }`}
            />
          </button>
        )}

        <button
          className="delete-btn"
          onClick={(event) => {
            event.stopPropagation();
            props.toggleLock(note.id);
          }}
        >
          {note.isLocked ? (
            <FontAwesomeIcon
              icon={icon({ name: "lock" })}
              className={`title ${
                note.id === props.currentNote.id ? "selected-note-icon" : ""
              }`}
            />
          ) : (
            <FontAwesomeIcon
              icon={icon({ name: "lock-open" })}
              className={`title ${
                note.id === props.currentNote.id ? "selected-note-icon" : ""
              }`}
            />
          )}
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar sidebar--expanded">
      <div className="sidebar--header">
        <h3>N✿tes</h3>
        <div className="sidebar-actions">
          <button
            className="new-note"
            onClick={props.newNote}
            aria-label="Create new note"
            title="Create new note"
          >
            <FontAwesomeIcon icon={icon({ name: "plus" })} />
          </button>
        </div>
      </div>
      {noteElements}
      <button
        className="sidebar-toggle sidebar-toggle--expanded"
        onClick={props.toggleSidebar}
        aria-label="Collapse sidebar"
        title="Collapse sidebar"
      >
        <FontAwesomeIcon icon={icon({ name: "angles-left" })} />
      </button>
    </section>
  );
}
