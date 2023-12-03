import React from 'react'
import spinnerStyle from "./spinner.module.css"

export default function Sipnner() {
  return (
    <div className={spinnerStyle.spinner_parent}>
        <div className={spinnerStyle.ldsring}><div></div><div></div><div></div><div></div></div>
    </div>
    
  )
}
