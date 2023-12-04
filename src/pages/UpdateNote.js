import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ProviderPass } from "../components/Provider";
import crNote from './styles/CreateNote.module.css'
import notePagStyle from "./styles/notePage.module.css"
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import BlotFormatter from "quill-blot-formatter";
import CreateButton from "../components/createButton/CreateButton";
import SideBar from "../components/SideBar/SideBar";
import { useParams } from "react-router-dom";
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

export default function UpdateNote() {
  const { id } = useParams();
  const getSingleNotePath = process.env.REACT_APP_GET_SINGLE_NOTE
  const { user } = useContext(ProviderPass);

  const [noteTitle, setNoteTitle] = useState(
    JSON.parse(localStorage.getItem("noteTitle")) || ""
  );
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noteContent, setNoteContent] = useState();

  const updateNote = async () => {
    setSending(true);

    try {
      const res = await axios.post(
        `https://kikla-139bdd8f8b23.herokuapp.com/${id}`,
        {
          content: noteContent,
          user: user,
          noteTitle: noteTitle,
        },
        { params: { noteId: id, uid: user.uid }, withCredentials: true }
      );

      setStatus(res.data);
      setSending(false);
    } catch (error) {
      setSending(false);
      console.log(error);
    }
  };

  useEffect(()=>{
    setLoading(true)
    
    const getSingleNote = async ()=>{
        try {
            const res = await axios.get(`${getSingleNotePath + id}`, 
            {params: { noteId: id, uid: user.uid }, withCredentials:true})
            setLoading(false)
            setNoteContent(res.data[0].content)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    getSingleNote()
},[id, user.id])

  return (
    <Container>
     
      {loading ? (
        <p className={notePagStyle.single_note_loading}>Loading Note...</p>
      ) : (
        <div className={crNote.createNote}>
           <Tasks />
      <CreateTask />
          <SideBar />
          <p className={crNote.note_create_title}>Update Note</p>

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
              value={noteContent}
              onChange={setNoteContent}
              modules={modules}
              formats={formats}
              className={crNote.custom_editor}
            />
          </div>

          <CreateButton text="Update Note" funName={updateNote} />
          <p className={crNote.note_response_status}>{status}</p>
        </div>
      )}
    </Container>
  );
}
