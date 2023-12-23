import React, { useEffect, useContext, useState } from "react";
import { ProviderPass } from "../components/Provider";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import SideBar from "../components/SideBar/SideBar";
import * as notePagStyle from "./styles/notePage.module.css";
import Container from "../components/container/Container";
import deleteIocn from "../utils/icons/delete.webp";
import updatePost from "../utils/icons/updatePost.webp";
import Tasks from "../components/Tasks/Tasks";
import CreateTask from "../components/Tasks/CreateTask";

import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function NotePage() {
  const { id } = useParams();
  const { user } = useContext(ProviderPass);

  const [loading, setLoading] = useState(false);
  const [noteContent, setNoteContent] = useState();
  const navigate = useNavigate();

  const getSingleNotePath = process.env.REACT_APP_GET_SINGLE_NOTE;
  const deleteSinglePostPath = process.env.REACT_APP_DELETE_NOTE;

  useEffect(() => {
    setLoading(true);

    const getSingleNote = async () => {
      try {
        const res = await axios.get(`${getSingleNotePath + id}`, {
          params: { noteId: id, uid: user.uid },
          withCredentials: true,
        });
        setLoading(false);
        setNoteContent(res.data[0]);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getSingleNote();
  }, [id, user.id]);

  const handleDeleteNote = async () => {
    try {
      const res = await axios.delete(`${deleteSinglePostPath + id}`, {
        params: { noteId: id, uid: user.uid },
        withCredentials: true,
      });

      alert(res.data);
      navigate("/pages/AllNotes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <SideBar />
      <Tasks />
      <CreateTask />

      {loading ? (
        <p className={notePagStyle.single_note_loading}>Loading Note...</p>
      ) : (
        <div className={notePagStyle.single_note_page}>
          <div className={notePagStyle.single_note_body}>
            <p className={notePagStyle.single_note_header}>
              {noteContent?.noteTitle}
            </p>

            {noteContent?.syntaxed === "true" ? (
              <>
                <SyntaxHighlighter language="javascript" style={dracula}>
                  {noteContent?.content}
                </SyntaxHighlighter>
              </>
            ) : (
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: noteContent?.content }}
              />
            )}
          </div>

          <div className={notePagStyle.buttons_for_singleNote}>
            <Link to={`/pages/UpdateNote/${id}`}>
              <img
                src={updatePost}
                alt="update"
                className={notePagStyle.notes_icons}
              />
            </Link>
            <img
              src={deleteIocn}
              alt="update"
              className={notePagStyle.notes_icons}
              onClick={handleDeleteNote}
            />
          </div>
        </div>
      )}
    </Container>
  );
}