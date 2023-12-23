import React from 'react'

import * as stylesIndex from "../../index.module.css"

export default function Container(props) {
  return (
    <section className={stylesIndex.container}>
        {props.children}
    </section>
  )
}
