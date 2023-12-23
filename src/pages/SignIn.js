import React, { useContext } from "react";
import CreateButton from "../components/createButton/CreateButton";
import { ProviderPass } from "../components/Provider";
import * as signInStyle from "./styles/signin.module.css";
import Sipnner from "../components/spinner/Sipnner";

export default function SignIn() {
  const { authHandler, loading } = useContext(ProviderPass);

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
