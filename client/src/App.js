import React, { useState } from 'react'
import NavBar from './Components/NavBar'
import Add from './Components/Add'
import Home from './Components/Home'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Wellcome from './Components/Wellcome'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Comp from './Components/Comp'
import Kart from './Components/Kart'
import PLogin from './Components/PLogin'
import PSignup from './Components/PSignup'
import Books from './Components/Books'
import MyBoks from './Components/MyBooks'
import img from './/Components/im.jpg'


const App = () => {

  const localStorageData_user = localStorage.getItem("user")
  const id = localStorage.getItem("id")
  const pid = localStorage.getItem("pid")


  return (
    <div className='main'>
    <NavBar ></NavBar>
    <br />
    <img src={img} alt="img" className='bgimg' />

      <Routes>
        {(localStorageData_user && (pid || id)) ?
          <Route element={<Comp></Comp>}>
            <Route path={`add`} element={<Add></Add>}></Route>
            <Route path={`books`} element={<Books></Books>}></Route>

            <Route path={`home`} element={<Home></Home>}></Route>
            <Route path={`kart`} element={<Kart></Kart>}></Route>
            <Route path='mybooks' element={<MyBoks></MyBoks>}></Route>
          </Route>
          :
          <>
            <Route path='/' element={<Wellcome></Wellcome>}></Route>
            <Route path='login' element={<Login></Login>}></Route>
            <Route path='plogin' element={<PLogin></PLogin>}></Route>
            <Route path='signup' element={<SignUp ></SignUp>}></Route>
            <Route path='psignup' element={<PSignup></PSignup>}></Route>
          </>
        }
      </Routes>
    </div>
  )
}

export default App