import React from 'react'
import * as styles from "./SideBar.module.css"
import { Link } from 'react-router-dom'

export default function SidebarLinkBlock({icon, linkName, path, funName}) {
  return (
    <Link to={path} className={styles.sidebar_link_block} onClick={funName}>
        <div className={styles.block_link_icon_name}>
          <img src={icon} alt='sidebar link blcok' className={styles.sidebar_link_icon} />
          <p>{linkName}</p>
        </div>
    </Link>
  )
}
