import React from "react";
import upDashStyles from "./uploadsDash.module.css";

export default function VideoFile({ fetchedFile }) {
  return (
    <div>
      <div>
        <video className={upDashStyles.video_style} controls>
          <source
            src={`${process.env.REACT_APP_FETCHED_FILE_PATH}${fetchedFile.file}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
