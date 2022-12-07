import React, { useState } from 'react'
import dummyImage from './book.jpg'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
// import Added from './Added'
const pid = localStorage.getItem("pid")


const Add = () => {
  const [pic, setpic] = useState()
  const pub = localStorage.getItem("name").replace(/"+/g, '')
  const pid = localStorage.getItem("pid").replace(/"+/g, '')

  const [book, setbook] = useState({ name: "", pub: pub, pid: pid, auther: "", price: "", available: '' })
  const [image, setimage] = useState("")
  const [added, setadded] = useState(true)
  const navigate = useNavigate()



 
  const inputHandler = (e) => {
    let i = document.querySelector('.img')
    i.src = URL.createObjectURL(e.target.files[0])

    axios.post('http://localhost:4000/img', image, image.name)
    .then((res) => {
      console.log(res.data)
      console.log("hellow ganesh")
    })
    .catch((err) => {
      console.log(err)
    })

  }


  const submitHandler = (e) => {
    e.preventDefault();
    // alert("submitted")
    if(book.name !== '' && book.auther !=='' && book.price !==''  && book.available !== ''){
   

    axios.post('http://localhost:4000/add', book)
      .then((res) => {
        // console.log(res.data)

      })
      .catch((err) => {
        // alert("wrong")
      })

    setadded(false)
    setbook({ name: "", pub: pub, auther: "", price: "", available: "" })
    let i = document.querySelector('.img')
    i.src = dummyImage
    // console.log(book)
  }
  else{
    alert("fill the all fields!")
  }
  }

  // 

  return (
    <div >




      <form className='addDiv' onSubmit={submitHandler} >

        <div className='photo'>
          <img src={dummyImage} alt="book" className='img' />
        </div>
        <div className='info'>

          <div className='i'>
            <label htmlFor="">Name : </label>
            <input type="text" value={book.name} onChange={(e) => { setbook({ ...book, name: e.target.value }) }} />
          </div>

          <div className='i'>
            <label htmlFor="">Author : </label>
            <input type="text" value={book.auther} onChange={(e) => { setbook({ ...book, auther: e.target.value }) }} />
          </div>

          <div className='pri' >
            <label htmlFor="" >Price : </label>
            <input type="number" value={book.price} onChange={(e) => { setbook({ ...book, price: e.target.value }) }} />
          </div>

          <div>
            <label htmlFor="">Book Type : </label>
            <select onChange={(e)=>{setbook({ ...book, available: e.target.value })}} >
            <option value="" >select book type</option>
            <option value="Novel" >Novel</option>
            <option value="Sci-Fi">Sci-Fi</option>
              <option value="Comics">Comics</option>
              <option value="bio-G">bio-G</option>
              <option value="History">History</option>
              <option value="Horror">Horror</option>
              <option value="Other">Other</option>
            </select>
          </div>


          <div>
            <label htmlFor="">Add Cover Photo : </label>
            <input type="file" className='pic' accept='image/*' onChange={inputHandler} />
          </div>

          <button type="submit" className='AddBook'>Add Book</button>

        </div>


      </form>






      <div className='added' style={{ display: added ? "none" : "block" }} >
        <h1>Added Successfully !!!</h1>

        <button onClick={() => { setadded(true); navigate(0)}}>OK</button>
        <Link to='/books'>see All Books</Link>
      </div>





    </div>
  )
}

export default Add