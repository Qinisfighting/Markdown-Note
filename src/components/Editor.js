import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";

export default function Editor({ currentNote, updateNote }) {
  const [selectedTab, setSelectedTab] = React.useState("write");
  const [draftBody, setDraftBody] = React.useState(currentNote.body);

  // whenever the note switches, reset the draft
  React.useEffect(() => {
    setDraftBody(currentNote.body);
  }, [currentNote.body, currentNote.id]);

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  // called on blur
  function commitChange() {
    if (draftBody !== currentNote.body) {
      updateNote(draftBody);
    }
  }

  return (
    <section className="pane editor">
      <ReactMde
        value={draftBody}
        onChange={setDraftBody}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        // commit timestamp & persist only when losing focus:
        childProps={{
          textArea: {
            onBlur: commitChange,
          },
        }}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
      />
    </section>
  );
}
