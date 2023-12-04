import React, { useEffect, useState, useRef, useContext } from "react";
import scratchStyle from "./ScratchPad.module.css";
import SmallTitleComponent from "../smallTitleComponent/SmallTitleComponent";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ProviderPass } from "../Provider";
import axios from "axios";

export default function ScratchPad() {
  const { user, setFetchNotes } = useContext(ProviderPass);
  const scratchRef = useRef(null);
  const [scratchValue, setScratchValue] = useState(
    JSON.parse(localStorage.getItem("scratchPad")) || ""
  );
  const [syntaxedScratchValue, setSyntaxedScratchValue] = useState("");

  useEffect(() => {
    localStorage.setItem("scratchPad", JSON.stringify(scratchValue));
    if (scratchRef.current.value.length === 0) {
      localStorage.setItem("scratchPad", null);
    }

    // Update syntaxedScratchValue whenever scratchValue changes
    setSyntaxedScratchValue(syntaxHighlight(scratchValue));
  }, [scratchValue]);

  const handleScratchPadValue = (e) => {
    setScratchValue(e.target.value);
  };

  const syntaxHighlight = (codeString) => {
    // Perform syntax highlighting logic here
    // You can use the same logic as in the Syntaxed component
    // For simplicity, we're using the docco style in this example
    return (
      <SyntaxHighlighter language="javascript" style={docco}>
        {codeString}
      </SyntaxHighlighter>
    );
  };
  const createNotePath = process.env.REACT_APP_CREATE_NOTE;
  const sendNote = async () => {
    try {
      const res = await axios.post(
        createNotePath,
        {
          content: syntaxedScratchValue.props.children,
          user: user,
          noteTitle: "",
          syntaxed: "true",
        },
        {
          withCredentials: true,
          headers: { "Content-type": "application/json" },
        }
        
        
      );
      if(res.status === 200){
        setFetchNotes(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={scratchStyle.scratchPad}>
      <SmallTitleComponent title="Syntax Pad" />

      <div className={scratchStyle.textarera_parent}>
        <textarea
          ref={scratchRef}
          type="textarea"
          name="scratchpad"
          id="scratchpad"
          placeholder="What do you think about Kiks?"
          className={scratchStyle.scratchpad_input}
          value={scratchValue}
          onChange={handleScratchPadValue}
        />
      </div>

      {/* Button to save both original and syntaxed content to the database */}
      <div onClick={sendNote} className={scratchStyle.save_btn}>Save to Database</div>
    </div>
  );
}
