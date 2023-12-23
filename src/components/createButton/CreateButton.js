import React from 'react'
import * as crBtnStyle from "./CreateButton.module.css"

export default function CreateButton({text, funName}) {
  return (
    <div className={text === 'Fuck It' ? crBtnStyle.create_btn_red : crBtnStyle.create_btn} onClick={funName}>
        <p>{text}</p>
    </div>
  )
}
