import React from 'react'
import * as smTitStyle from "./SmallTitleComponent.module.css"

export default function SmallTitleComponent({title}) {
  return (
    <p className={smTitStyle.small_title_component}>{title}</p>
  )
}
