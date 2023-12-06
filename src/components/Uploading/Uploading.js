import React from 'react'
import uploadingStyle from "./uploading.module.css"

export default function Uploading({text}) {
  return (
    <div className={uploadingStyle.uplading_file_status}>{text}</div>
  )
}
