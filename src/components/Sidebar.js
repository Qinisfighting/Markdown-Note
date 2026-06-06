import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Sidebar(props) {
  if (props.isCollapsed) {
    return (
      <section className="pane sidebar sidebar--collapsed">
        <div className="sidebar-controls sidebar-controls--collapsed">
          <button
            className="new-note"
            onClick={props.newNote}
            aria-label="Create new note"
            title="Create markdown"
          >
            <FontAwesomeIcon icon={icon({ name: "plus" })} />
          </button>
          <button
            className="sidebar-toggle"
            onClick={props.toggleSidebar}
            aria-label="Expand sidebar"
            title="Expand sidebar"
          >
            <FontAwesomeIcon icon={icon({ name: "angles-right" })} />
          </button>
        </div>
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
            aria-label="Delete note"
            title="Delete note"
          >
            <FontAwesomeIcon
              icon={icon({ name: "trash" })}
              className={
                note.id === props.currentNote.id ? "selected-note-icon" : ""
              }
            />
          </button>
        )}

        <button
          className="delete-btn"
          onClick={(event) => {
            event.stopPropagation();
            props.toggleLock(note.id);
          }}
          aria-label={note.isLocked ? "Unlock note" : "Lock note"}
          title={note.isLocked ? "Unlock note" : "Lock note"}
        >
          {note.isLocked ? (
            <FontAwesomeIcon
              icon={icon({ name: "lock" })}
              className={
                note.id === props.currentNote.id ? "selected-note-icon" : ""
              }
            />
          ) : (
            <FontAwesomeIcon
              icon={icon({ name: "lock-open" })}
              className={
                note.id === props.currentNote.id ? "selected-note-icon" : ""
              }
            />
          )}
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar sidebar--expanded">
      <div className="sidebar--header">
        <div className="sidebar-controls">
          <button
            className="new-note"
            onClick={props.newNote}
            aria-label="Create new note"
            title="Create markdown"
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
