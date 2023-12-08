import React from "react";
import upDashStyles from "./uploadsDash.module.css";
import trashCan from "../../utils/icons/delete.webp"

export default function VideoFile({ fetchedFile, funName }) {
  return (
      <div className={upDashStyles.video_type_file_container}>
        <img className={upDashStyles.trash_can} src={trashCan} alt="delete trash can" onClick={funName}/>
        <video className={upDashStyles.video_style} controls>
          <source
            src={`${process.env.REACT_APP_SINGLE_FILE_PATH}${fetchedFile.file}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
  );
}
