import React, {useContext } from 'react';
import CreateButton from '../components/createButton/CreateButton';
import { ProviderPass } from '../components/Provider';
import * as signInStyle from './styles/signin.module.css';


export default function SignIn() {
  const { authHandler} = useContext(ProviderPass)

  return (
    <div className={signInStyle.signin}>
      <CreateButton text='Sign In' funName={authHandler} />
    </div>
  );
}
