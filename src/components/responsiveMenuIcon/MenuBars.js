import React, { useContext, useEffect, useState } from 'react'
import { ProviderPass } from '../Provider'
import menuOpen from "../../utils/icons/menu.webp"
import menuClose from "../../utils/icons/close.webp"
import resMenuIconStyle from "./responsiveMenuIcon.module.css"

export default function MenuBars() {
    const {sidebarHandler,setSideBarHandler} = useContext(ProviderPass)
    const [menuIcon, setMenuIcon] = useState(menuOpen)

    const menuHandler = () => {
        if(sidebarHandler){
            setSideBarHandler(false)
            setMenuIcon(menuOpen)
        }else{
            setSideBarHandler(true)
            setMenuIcon(menuClose)
        }
    }

    useEffect(()=>{
        if(sidebarHandler){
            setMenuIcon(menuClose)
        }else{
            setMenuIcon(menuOpen)
        }
    },[sidebarHandler])

  return (
    
 
    <div className={resMenuIconStyle.responsiveMenuIcon}>
        <img src={menuIcon} alt='menu' className={resMenuIconStyle.menu_icon_responsive} onClick={menuHandler}/>
    </div>
  
  )
}
