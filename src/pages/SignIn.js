import React, { useContext, useEffect } from "react";
import CreateButton from "../components/createButton/CreateButton";
import { ProviderPass } from "../components/Provider";
import * as signInStyle from "./styles/signin.module.css";
import Sipnner from "../components/spinner/Sipnner";
import { useNavigate } from "react-router-dom";
import * as styles from "../../src/index.module.css"

export default function SignIn() {
  const { authHandler, loading, user, currentUser } = useContext(ProviderPass);
  const navigate = useNavigate()

  useEffect(()=>{
    if(user || currentUser){
      navigate('/pages/Evernote')
    }
  },[])

  return (
    <div className={signInStyle.signin}>
      {loading ? (
        <Sipnner />
      ) : (
        <>
          <p className={styles.stand_by}>This website is hosted on a free host, so you may need to wait a few minutes for it to recover. 
            <span className={styles.stand_by_pls}> Please stand by.</span>
          </p>
          <CreateButton text="Sign In" funName={authHandler} />
        </>
      )}
    </div>
  );
}
