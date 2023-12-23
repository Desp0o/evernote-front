import React, { useEffect, useState, useContext } from "react";
import { ProviderPass } from "../components/Provider";
import axios from "axios";
import * as styles from "./styles/allnotes.module.css";
import SideBar from "../components/SideBar/SideBar";
import SingleNote from "../components/singleNote/SingleNote";
import Container from "../components/container/Container";
import Tasks from "../components/Tasks/Tasks";
import CreateTask from "../components/Tasks/CreateTask";
import Sipnner from "../components/spinner/Sipnner";

export default function AllNotes() {
  const { user, closeAllTaskElements } = useContext(ProviderPass);

  const [notesArray, setNotesArray] = useState([]);
  const [notesArrayReversed, setNotesArrayReversed] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllNotesPath = process.env.REACT_APP_GET_ALL_NOTES;

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);

      try {
        const res = await axios.get(getAllNotesPath, {
          params: { uid: user.uid },
          withCredentials: true,
        });
        setNotesArray(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getNotes();
  }, []);

  useEffect(() => {
    setNotesArrayReversed(notesArray.reverse());
  }, [notesArray]);

  return (
    <>
    <SideBar />
      {loading ? (
        <Sipnner />
      ) : (
        <Container>
          
          <Tasks />
          <CreateTask />
          <div className={styles.allnotes}>
            {notesArrayReversed?.map((note) => {
              return (
                <SingleNote
                  key={note.noteId}
                  title={note.noteTitle}
                  content={note.content}
                  timeStamp={note.timeStamp}
                  id={note.noteId}
                  funName={closeAllTaskElements}
                />
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
}
