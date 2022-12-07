import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import bgImage from './bg1.png'


const SignUp = () => {
    const [err, seterr] = useState(false)
    const [error, seterror] = useState(false)
    const navigate = useNavigate()
    const [pass, setpass] = useState(true)
    const [user, setuser] = useState({ name: "", password: null, email: "" })
    // const [ displayOTPBox, setdisplayOTPBox] = useState(false)
    // const [inputOTP, setinputOTP] = useState('')
    // const [OTP, setOTP] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();

        if (user.email !== "" && user.email !== null && user.password.length >= 8 && user.name !== "" && user.name !== " ") {
            const obj = {
                "name": `${user.name}`,
                "pass": `${user.password}`,
                "email": `${user.email}`
            }
            // setdisplayOTPBox(true)
            axios.post('http://localhost:4000/signup', obj)
            .then((res) => {
                console.log(res)
                if (res.data.name == user.name) {
                    localStorage.setItem("user", JSON.stringify(user))
                    localStorage.setItem("id", JSON.stringify(res.data._id))
                    localStorage.setItem("name", JSON.stringify(res.data.name))
                    navigate(`/home`)
                    window.location.reload();
                    }
                })
                .catch((err) => {
                    alert("wrong")
                    console.log(err)
                    seterr(true)
                })

            setuser({ name: "", email: "", password: "" })

        } else {
            alert("Enter valid credentials")
        }
    }

    return (
        <div>

        <img src={bgImage} alt="img" className='bgImage' />
        <Link to='/' className='goBack'> ⬅ GO BACK</Link>


        <h2 className='acHeading' >Hellow Reader 📚📚 ,</h2>

        <Link to='/' className='goBack'>GO BACK</Link>
        <h2 >Hellow User,</h2>
            <form onSubmit={submitHandler} className="form">

                <input type="text" placeholder='Enter your Name' value={user.name} onChange={(e) => setuser({ ...user, name: e.target.value })} />

                <input type="email" placeholder='Enter Email-Id' value={user.email} onChange={(e) => setuser({ ...user, email: (e.target.value).toLowerCase()  })} />

                {err ?
                    <div className='err extra'>
                        <span> Email Already exists... </span>
                    </div>
                    : null}

                <div className="password ">
                    <input placeholder='Create Password ' type={pass ? 'password' : 'text'} value={user.password} onChange={(e) => setuser({ ...user, password: e.target.value })} /> {
                        pass ? <FaEye className='eye' onClick={() => { setpass(!pass) }}></FaEye> :
                            <FaEyeSlash className='eye' onClick={() => { setpass(!pass) }}></FaEyeSlash>
                    }
                </div>

                <div className='err extra'>{user.password !== null && user.password.length < 8 && user.password !== "" ? <span>Enter minimum 8 characters </span> : null}</div>

                <span className='forgotPass'>
                Already Have Account <a href="/login" target="blank">Click Here</a>
            </span>

                <button type="submit">Sign-UP</button>
            </form>

        </div>
    )
}

export default SignUp