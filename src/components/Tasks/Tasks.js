import React, { useContext, useState, useEffect } from "react";
import * as stylesTask from "./Tasks.module.css";
import axios from "axios";
import { ProviderPass } from "../Provider";
import TaskSingleElement from "./TaskSingleElement";
import Spinner from "../spinner/Sipnner";
import closeTaskIcon from "../../utils/icons/closeTaskIcon.webp" 

export default function Tasks() {
  const { user, taskToggler, loading, taskHandler, setLoading, taskHandlerWork, setTaskHandlerWork } = useContext(ProviderPass);
  const [activeElement, setActiveElement] = useState(null);
  const [allTasksArray, setAllTasksArray] = useState([]);
  const [allTasksArrayReversed, setAllTasksArrayReversed] = useState([]);
  

  const getAllTasksPath = process.env.REACT_APP_GET_TASK;
  const getTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(getAllTasksPath, {
        params: { uid: user.uid },
        withCredentials: true,
      });
      setAllTasksArray(res.data);
      setLoading(false);
      setTaskHandlerWork(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    
  };

  useEffect(() => {
    setAllTasksArrayReversed(allTasksArray.reverse());
  }, [allTasksArray]);

  useEffect(() => {
    if(taskHandlerWork === true){
      getTasks();
    }

    // eslint-disable-next-line
  }, [taskHandlerWork]);

  useEffect(() => {
      getTasks();
      // eslint-disable-next-line
  }, [user]);



  const taskDeletePath = process.env.REACT_APP_TASK_DELETE
  const deleteHandler = async (elementId) => {
    setLoading(true);
    try {
      await axios.delete(
        `${taskDeletePath + elementId}`,
        {
          params: { user: user.uid, taskId: elementId },
        },
        {
          withCredentials: true,
          headers: { "Content-type": "application/json" },
        }
      );
      
      setTaskHandlerWork(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  

  const taskUpdatePath = process.env.REACT_APP_TASK_UPDATE;

  const markAsComplete = async (elementId) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${taskUpdatePath + elementId}`,
        {
          completed: true,
          user: user,
          taskId: elementId,
        },
        {
          withCredentials: true,
          headers: { "Content-type": "application/json" },
        }
      );

      if (res.status === 200) {
        setTaskHandlerWork(true);
      }

     
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  };

  return (
    <div className={taskToggler ? stylesTask.tasks : stylesTask.tasksDisabled}>
      <img src={closeTaskIcon} alt="task closer" className={stylesTask.task_closer} onClick={taskHandler} />
      <div className={stylesTask.task_elements}>
        {loading ? (
          <Spinner />
        ) : (
          allTasksArrayReversed.map((item) => {
            return (
              <TaskSingleElement
                key={item.taskId}
                body={item.taskContent}
                nameOfClass={
                  (activeElement === item.taskId && stylesTask.task_circle_filled) ||
                  (item.completed === "true" && stylesTask.task_circle_filled)
                }
                bodyClass={
                  (activeElement === item.taskId && stylesTask.task_single_element_body_completed) ||
                  (item.completed === "true" && stylesTask.task_single_element_body_completed)
                }
                deleteHandler={() => (
                  setActiveElement(item.taskId), deleteHandler(item.taskId)
                )}
                completedHandler={() => (
                  setActiveElement(item.taskId), markAsComplete(item.taskId)
                )}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
