import React, { useContext, useEffect, useState } from "react";
import { ProviderPass } from "../Provider";
import stylesTask from "./Tasks.module.css";
import axios from "axios";
import TaskButtonComponent from "./TaskButtonComponent";
import Uploading from "../Uploading/Uploading";

export default function CreateTask() {
  const { createTaks, setTaskHandlerWork, user, closeAllTaskElements } =
    useContext(ProviderPass);
  const [taskContent, setTaskContent] = useState("");
  const createTaskPath = process.env.REACT_APP_CREATE_TASK;
  const [taskStatus, setTaskStatus] = useState("");

  const [isSending, setIsSending] = useState(false);

  const sendTask = async () => {
    if (taskContent.length > 0) {
      setIsSending(true);
      try {
        const res = await axios.post(
          createTaskPath,
          {
            taskContent: taskContent,
            completed: false,
            user: user,
          },
          {
            withCredentials: true,
            headers: { "Content-type": "application/json" },
          }
        );

        if (res.status === 200) {
          setTaskHandlerWork(true);
        }

        setIsSending(false);
        setTaskStatus(res.data);
        setTaskContent("");
      } catch (error) {
        console.log(error);
        setTaskStatus("Here Is Some Error");
        setIsSending(false);
      }
    } else {
      setIsSending(false);
      setTaskStatus("Enter Task You Lazy..");
    }
  };

  const clearTaskStatus = () => {
    setTaskStatus("");
  };

  return (
    <div
      className={
        createTaks
          ? stylesTask.create_task_bg
          : stylesTask.create_task_bg_disabled
      }
    >
      <div className={stylesTask.create_task}>
        <div className={stylesTask.taks_dot}>
          <div className={stylesTask.task_circle} />
          <input
            type="text"
            className={stylesTask.task_input}
            id="taskInput"
            name="taksContent"
            placeholder="Enter Task Here"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
          />
        </div>

        {isSending ? (
          <div className={stylesTask.sending_status_style}>
            <Uploading text="Creating Task . . ." />
          </div>
        ) : (
          <p
            className={
              taskStatus === "Task has been created successfully."
                ? stylesTask.task_status
                : stylesTask.task_status_error
            }
          >
            {taskStatus}
          </p>
        )}

        <div className={stylesTask.crt_tasks_btns}>
          <TaskButtonComponent
            text="Cancel"
            funName={() => {
              closeAllTaskElements();
              clearTaskStatus();
            }}
          />
          <TaskButtonComponent text="Create Task" funName={sendTask} />
        </div>
      </div>
    </div>
  );
}
