import React, { useContext, useEffect, useState } from "react";
import noteDashStyle from "./NotesDashboard.module.css";
import SmallTitleComponent from "../smallTitleComponent/SmallTitleComponent";
import SingleNote from "../singleNote/SingleNote";
import { ProviderPass } from "../Provider";
import axios from "axios";
import Spinner from "../spinner/Sipnner";

export default function NotesDashboard() {
  const { user, fetchNotes, setFetchNotes } = useContext(ProviderPass);

  const [notesArray, setNotesArray] = useState([]);
  const [notesArrayReversed, setNotesArrayReversed] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllNotesPath = process.env.REACT_APP_GET_ALL_NOTES


  const getNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(getAllNotesPath, {
        params: { uid: user.uid },
        withCredentials: true,
      });
      setNotesArray(res.data.reverse());
      setLoading(false);
      setFetchNotes(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    getNotes();
  }, [fetchNotes]);

  useEffect(() => {
    setNotesArrayReversed(notesArray);
  }, [notesArray]);

  return (
    <div className={noteDashStyle.notes_dashboard}>
      <SmallTitleComponent title="NOTES" />

      <div className={noteDashStyle.notes_container}>
        {loading ? (
          <Spinner />
        ) : notesArrayReversed.length === 0 ? (
          <p className={noteDashStyle.empty_notes_container}>You Have No Notes</p>
        ) : (
          notesArrayReversed?.map((note) => {
            return (
              <SingleNote
                key={note.noteId}
                title={note.noteTitle}
                content={note.content}
                timeStamp={note.timeStamp}
                id={note.noteId}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
