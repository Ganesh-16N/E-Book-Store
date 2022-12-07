import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Comp = () => {
    const auth = localStorage.getItem("user")
  return auth ? <Outlet></Outlet> : <Navigate to='/'></Navigate>
}

export default Comp  