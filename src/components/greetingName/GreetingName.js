import React, { useContext } from 'react'
import { ProviderPass } from '../Provider'
import greetNameStyle from "./greetingName.module.css"

export default function GreetingName() {
    const {currentUser} = useContext(ProviderPass)
    const name = JSON.parse(currentUser)

  return (
    <div className={greetNameStyle.GreetingName}>Hello, {name}</div>
  )
}
