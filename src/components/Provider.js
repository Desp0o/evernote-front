import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "./Firebase";
import { useNavigate } from "react-router-dom";

export const ProviderPass = createContext();

export const ProviderContext = ({ children }) => {
  const navigate = useNavigate();
  const [taskToggler, setTaskToggler] = useState(false);
  const [createTaks, setCreateTask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [taskHandlerWork, setTaskHandlerWork] = useState(false);
  const [sidebarHandler, setSideBarHandler] = useState(false)
  const [signInError, setSignInError] = useState(false)
  const [searchStatus, setSearchStatus] = useState(false)
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const auth = getAuth(app);

  const loginPath = process.env.REACT_APP_LOGIN;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user.displayName));
        setCurrentUser(localStorage.getItem("currentUser"));
      } else {
        setUser(null);
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (currentUser === null) {
      handleLogout();
    }
  }, [currentUser]);

  const authHandler = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userData = {
        displayName: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
        photoURL: result.user.photoURL,
      };

      const res = await axios.post(loginPath, userData, {
        withCredentials: true,
        headers: { "Content-type": "application/json" },
      });

      if(res.status === 200){
        navigate("/pages/Evernote");
      }
      
    } catch (error) {
      console.error("Authentication Error:", error.message);
      console.log(error);
      setSignInError(true)
      alert('Server Error')
      navigate('/')
      handleLogout()
    }

   
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const taskHandler = () => {
    if (taskToggler) {
      setTaskToggler(false);
    } else {
      setTaskToggler(true);
    }
  };

  const CreateTaksHandler = () => {
    if (createTaks) {
      setCreateTask(false);
    } else {
      setCreateTask(true);
    }
  };

  const CloseCreateTask = () => {
    setCreateTask(false);
  };

  const closeAllTaskElements = () => {
    setTaskToggler(false);
    setCreateTask(false);
  };

  return (
    <ProviderPass.Provider
      value={{
        currentUser,
        user,
        authHandler,
        handleLogout,
        taskToggler,
        taskHandler,
        CreateTaksHandler,
        createTaks,
        CloseCreateTask,
        closeAllTaskElements,
        taskHandlerWork,
        setTaskHandlerWork,
        loading,
        setLoading,
        sidebarHandler, 
        setSideBarHandler,
        signInError,
        searchStatus,
        setSearchStatus
      }}
    >
      {children}
    </ProviderPass.Provider>
  );
};
