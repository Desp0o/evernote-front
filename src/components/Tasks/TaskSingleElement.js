import React from "react";
import trashCan from "../../utils/icons/delete.webp"
import styles from "./Tasks.module.css";

export default function TaskSingleElement({body, funName, nameOfClass, deleteHandler, completedHandler, bodyClass}) {
  return (
    <div className={styles.task_single_element}>
      <div className={`${styles.task_circle} ${nameOfClass}`} onClick={completedHandler}/>
      <p className={`${styles.task_single_element_body} ${bodyClass}`} onClick={completedHandler}>{body}</p>
      <img src={trashCan} alt="delete" className={styles.task_trash} onClick={deleteHandler}/>
    </div>
  );
}
