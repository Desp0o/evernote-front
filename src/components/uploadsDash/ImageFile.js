import React, { useState } from "react";
import upDashStyles from "./uploadsDash.module.css";

export default function ImageFile({ fetchedItem }) {
  const [isFullScreenImage, setIsFullScreenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openImageFullScreenHandler = (fetchedItem) => {
    if (!isFullScreenImage) {
      setIsFullScreenImage(true);
      setSelectedImage(fetchedItem.file);
    } else {
      setIsFullScreenImage(false);
    }
  };

  const closeFullScreenImageHandler = () => {
    setIsFullScreenImage(false);
  };


  return (
    <div>
      <img
        src={`${process.env.REACT_APP_FETCHED_FILE_PATH}${fetchedItem.file}`}
        className={upDashStyles.fetched_file_image}
        onClick={() => openImageFullScreenHandler(fetchedItem)}
      />

      <img
        src={`${process.env.REACT_APP_FETCHED_FILE_PATH}${selectedImage}`}
        className={
          isFullScreenImage
            ? upDashStyles.fetched_file_image_full_screen
            : upDashStyles.fetched_file_image_full_screen_disabled
        }
        onClick={closeFullScreenImageHandler}
      />
    </div>
  );
}
