import React from 'react'
import dataStyle from "./date.module.css"

export default function CurrentDate() {

  const currentDate = new Date()

  const optionsDay = { weekday: 'long' }
  const fullDayName = currentDate.toLocaleString('en-US', optionsDay)

  const dayNumber = currentDate.getDate()
  const year = currentDate.getFullYear()

  const currentMonth = currentDate.getMonth()
  const optionsMonth = { month: 'long' }
  const fullMonthName = new Date(currentDate.getFullYear(), currentMonth, 1).toLocaleString('en-US', optionsMonth)
    
  return (
    <div className={dataStyle.date}>
      <p>{fullDayName},</p> &nbsp;&nbsp;
      <p>{fullMonthName}</p>&nbsp;&nbsp;
      <p>{dayNumber},</p> &nbsp;&nbsp;
      <p>{year}</p>
    </div>
  )
}
