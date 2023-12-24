import React, { useContext, useEffect } from "react";
import CreateButton from "../components/createButton/CreateButton";
import { ProviderPass } from "../components/Provider";
import * as signInStyle from "./styles/signin.module.css";
import Sipnner from "../components/spinner/Sipnner";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const { authHandler, loading, user } = useContext(ProviderPass);
  const navigate = useNavigate()

  useEffect(()=>{
    if(user){
      navigate('/pages/Evernote')
    }
  },[])

  return (
    <div className={signInStyle.signin}>
      {loading ? (
        <Sipnner />
      ) : (
        <CreateButton text="Sign In" funName={authHandler} />
      )}
    </div>
  );
}
