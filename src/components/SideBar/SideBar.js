import React, {useContext} from 'react'
import { ProviderPass } from '../Provider'
import * as styles from "./SideBar.module.css"
import Search from '../Search/Search'
import AddNew from '../addNew/AddNew'
import SidebarLinkBlock from './SidebarLinkBlock'

import home from "../../utils/icons/home.webp"
import checkedGrey from "../../utils/icons/checkedGrey.webp"
import notesGrey from "../../utils/icons/notesGrey.webp"
import CreateButton from "../createButton/CreateButton"


export default function SideBar() {

  const {handleLogout, taskHandler, closeAllTaskElements, sidebarHandler, setSideBarHandler} = useContext(ProviderPass)

  return (
    <div className={sidebarHandler ? styles.sidebar_active : styles.sidebar}>

        <div className={styles.sidebar_top}>
          <Search />
          <AddNew />
        </div>

        <div className={styles.sidebar_bottom}>
          <SidebarLinkBlock linkName='Home' icon={home} path='/pages/Evernote' funName={()=>(closeAllTaskElements(), setSideBarHandler(false))} />
          <SidebarLinkBlock linkName='Notes' icon={checkedGrey} path='/pages/AllNotes' funName={()=>(closeAllTaskElements(), setSideBarHandler(false))} />
          <SidebarLinkBlock linkName='Tasks' icon={notesGrey} funName={()=>(taskHandler(), setSideBarHandler(false))}/>
        </div>

        <div className={styles.logout_div}>
          <CreateButton text="Log Out" funName={handleLogout}/>
        </div>
        
    </div>
  )
}
