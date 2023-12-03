import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ProviderPass } from './Provider'
import Spinner from "./spinner/Sipnner"

export default function PrivateRoutes() {
  
    const {user} = useContext(ProviderPass)

  return (
    user === null ?  <Spinner /> : <Outlet />
  )
}
