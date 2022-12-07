import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import bgImage from './bg1.png'

const PLogin = () => {
    // const [error, seterror] = useState(false)
    const [err, seterr] = useState(false)
    const [pass, setpass] = useState(true)
    const navigate = useNavigate()
    const [user, setuser] = useState({ email: "", password: null })

    const submitHandler = (e) => {
        e.preventDefault();

        if (user.email !== "" && user.email !== null && user.password.length >= 8) {

            const obj = {
                "email": `${user.email}`,
                "pass": `${user.password}`
            }
            axios.post('http://localhost:4000/plogin', obj)
                .then((res) => {

                    if(res.data.email == user.email){
                        localStorage.setItem("user", JSON.stringify(user))
                        localStorage.setItem("pid", JSON.stringify(res.data._id))
                        localStorage.setItem("name", JSON.stringify(res.data.name))
                        navigate(`/add`)
                        window.location.reload()
                    }else{
                        seterr(true)
                    }
                })
                .catch((err) => {
                    seterr(true)
                })

            setuser({ email: "", password: "" })
        } else {
            alert("Enter valid credentials")
        }



    }

    return (
        <div>
        <img src={bgImage} alt="img" className='bgImage' />
        <Link to='/' className='goBack'> ⬅ GO BACK</Link>


        <h2 className='acHeading' >Hellow Publisher,</h2>
        <form onSubmit={submitHandler} className="form">

                <input type="email" placeholder='Email-Id' value={user.email} onChange={(e) => setuser({ ...user, email:(e.target.value).toLowerCase()  })} />


                {err ?
                    <div className='err extra' >
                    <span> <span className='warn'>⚠⚠</span> Something Went Worng......
                    try again
                    
                    </span>
                    </div>
                    : null}

                <div className="password">
                    <input placeholder='Password ' type={pass ? 'password' : 'text'} value={user.password} onChange={(e) => setuser({ ...user, password: e.target.value })} /> {
                        pass ? <FaEye className='eye' onClick={() => { setpass(!pass) }}></FaEye> :
                            <FaEyeSlash className='eye' onClick={() => { setpass(!pass) }}></FaEyeSlash>
                    }
                </div>

                <div className='err extra'>{user.password !== null && user.password.length < 8 && user.password !== "" ? <span>Enter minimum 8 characters </span> : null}</div>


                <span className='forgotPass'>
                    Dont Have Account <a href="/psignup" target="blank">Create Here</a> 
                </span>
                <button type="submit">LOGIN</button>
            </form>

        </div>
    )
}

export default PLogin



