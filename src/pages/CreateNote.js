import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ProviderPass } from "../components/Provider";
import crNote from "./styles/CreateNote.module.css"
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import BlotFormatter from "quill-blot-formatter";
import CreateButton from "../components/createButton/CreateButton";
import SideBar from "../components/SideBar/SideBar";
import Container from "../components/container/Container";
import Tasks from '../components/Tasks/Tasks'
import CreateTask from "../components/Tasks/CreateTask"

Quill.register("modules/blotFormatter", BlotFormatter);

const modules = {
  blotFormatter: {},
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // text color and background color
    [{ font: [] }], // font family
    [{ align: [] }], // text alignment
    ["image"],
    ["link"], // add a link option
    ["video"], // add a video embed option
    ["clean"],
    
  ],
  clipboard: {
    matchVisual: true,
  },
  syntax: {
    highlight: text => hljs.highlightAuto(text).value
  }
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code-block",
  "align",
  "video",
  "formula",
  "table",
  "color",
  "background",
  "font",
  "script",
  "size",
  "blockquote",
  "float",
];

export default function CreateNote() {
  const { user } = useContext(ProviderPass);
  const [content, setContetn] = useState(
    JSON.parse(localStorage.getItem("editorNote")) || {}
  );
  const [noteTitle, setNoteTitle] = useState(
    JSON.parse(localStorage.getItem("noteTitle")) || ""
  );
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const createNotePath = process.env.REACT_APP_CREATE_NOTE

  const sendNote = async () => {
    setSending(true);

    try {
      const res = await axios.post(
        createNotePath,
        {
          content: content,
          user: user,
          noteTitle: noteTitle,
        },
        {
          withCredentials: true,
          headers: { "Content-type": "application/json" },
        }
      );

      setStatus(res.data);
      setSending(false);
    } catch (error) {
      setSending(false);
      console.log(error);
    }

    setContetn({});
    setNoteTitle("");
  };

  useEffect(() => {
    localStorage.setItem("editorNote", JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem("noteTitle", JSON.stringify(noteTitle));
  }, [noteTitle]);

  return (
    <Container>
      <Tasks />
        <CreateTask />
      <div className={crNote.createNote}>
        <SideBar />

        <p className={crNote.note_create_title}>Create Note</p>

        <div className={crNote.noteArea}>
          <input
            className={crNote.note_title_input}
            type="text"
            name="noteTitle"
            id="noteTitle"
            placeholder="Enter Note Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContetn}
            modules={modules}
            formats={formats}
            className={crNote.custom_editor}
          />
        </div>

        <CreateButton text="Create Note" funName={sendNote} />
        <p className={crNote.note_response_status}>{status}</p>
      </div>
    </Container>
  );
}
