import React, { useState } from "react";
import upDashStyles from "./uploadsDash.module.css";
import trashCan from "../../utils/icons/delete.webp"

export default function ImageFile({ fetchedItem, funName }) {
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
    <div className={upDashStyles.image_type_file_container} >
      <img className={upDashStyles.trash_can} src={trashCan} alt="delete trash can" onClick={funName}/>
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
