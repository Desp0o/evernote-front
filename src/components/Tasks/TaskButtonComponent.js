import React from 'react'
import * as stylesTask from "./Tasks.module.css"

export default function TaskButtonComponent({text, funName}) {
  return (
    <div className={text === 'Cancel' ? stylesTask.TaskButtonComponent : stylesTask.TaskButtonComponentGreen} onClick={funName}>
        {text}
    </div>
  )
}
