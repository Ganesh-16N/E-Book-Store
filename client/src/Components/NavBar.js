import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'


const NavBar = () => {
  const navigate = useNavigate()
  const localStorageData = localStorage.getItem("user")
  const id = localStorage.getItem("id")
  const pid = localStorage.getItem("pid")

  const name = localStorage.getItem("name") ? localStorage.getItem("name").replace(/"+/g, '') : "name"


  const dlt = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("name")

    pid ? localStorage.removeItem("pid") : localStorage.removeItem("id");
    navigate('/')
    // window.location.reload()

    window.location.reload()
  }
  




  return (
    <div>

      <nav className='nav' >

        {
          id ?
            <div className='show' >

              <span>
                <span>LOGO</span>
                <Link to={`home`}>  🏡 Home</Link>
              </span>

              <span>
                <Link to={`kart`}> 🛒 Kart</Link>
                <Link to={`mybooks`}> 📚myBooks</Link>
                <Link to='/' onClick={dlt}>📤 Logout</Link>
              </span>

            </div>
            :
            null
        }

        {
          pid ?
            <div className='show' >
              <span className='pName'>{name}</span>
              <span>

                <Link to={`add`}>ADD BOOK</Link>
                <Link to={`books`}>ALL BOOKS</Link>
                <Link to='/' onClick={dlt}>Logout</Link>
              </span>
            </div>
            :
            null
        }


      </nav>
      <div className='space'>

      </div>



    </div>
  )
}

export default NavBar