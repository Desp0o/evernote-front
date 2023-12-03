import React from "react";
import {HashRouter, Routes, Route } from "react-router-dom";
import Evernote from "./pages/Evernote";
import CreateNote from "./pages/CreateNote";
import SignIn from "./pages/SignIn";
import PrivateRoutes from "./components/PrivateRoutes";
import NotePage from "./pages/NotePage";
import UpdateNote from "./pages/UpdateNote";
import AllNotes from "./pages/AllNotes";
import MenuBars from "./components/responsiveMenuIcon/MenuBars";
import { ProviderContext } from "./components/Provider";
import styles from "./index.module.css"


export function App() {
  return (
    <HashRouter>
      <ProviderContext>
        <MenuBars />
        <Routes>
        <Route exact path="/" element={<SignIn />} />

        <Route element={<PrivateRoutes />}>
          <Route exact path="/pages/Evernote" element={<Evernote />} />
          <Route exact path="/pages/CreateNote" element={<CreateNote />} />
          <Route exact path="/pages/NotePage/:id" element={<NotePage />} />
          <Route exact path="/pages/UpdateNote/:id" element={<UpdateNote />} />
          <Route exact path="/pages/AllNotes" element={<AllNotes />} />
        </Route>
        </Routes>
      </ProviderContext>
    </HashRouter>
  );
}
