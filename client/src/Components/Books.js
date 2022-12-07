import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaRupeeSign } from 'react-icons/fa'
import axios from 'axios'
let pid = localStorage.getItem('pid') ? localStorage.getItem('pid').replace(/"+/g, "") : " "
const pub = localStorage.getItem("name")


const Books = () => {
  const [list, setlist] = useState([])
  const [search, setsearch] = useState("")
  const [update, setupdate] = useState(false)
  const [book, setbook] = useState('')
  const [dlt, setdlt] = useState(false)
  const [deleteItem, setdeleteItem] = useState({ book: '', id: '' })
  const navigate = useNavigate()
  const location = useLocation()

  

  useEffect(() => {
    return () => {
      const x = async () => {
        await axios.get('http://localhost:4000/pbooks')
          .then((res) => {
            setlist(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
      x()
    }
  }, [location.state])


  const updateProduct = () => {
    axios.put(`http://localhost:4000/add/${book.id}`, book)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    // window.location.reload()
    // navigate(0)
    setupdate(false)
  }

  const deleteProduct = () => {
    axios.delete(`http://localhost:4000/dltbook/${deleteItem.id}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      });
      
    // window.location.reload()
    navigate(0)
    setdlt(false)
  }
  
  

  const inputHandler = (e) => {
    let i = document.querySelector('.img')
    i.src = URL.createObjectURL(e.target.files[0])
  }



  return (
    <div className='books'>
      <input type="text" onChange={(e) => { setsearch(e.target.value) }} className='search' placeholder='search by book or auther' /><span> </span>

      {
        list.map((i, ind) => {
          console.log(i.pid, pid)
          if (i.pid == pid) {
            return (i.name.toLowerCase().includes(search.toLowerCase()) || i.auther.toLowerCase().includes(search.toLowerCase())) && <div className='mainCard' key={ind}>


              <div className='up'>

                <div className='left'>
                  <div className='im' >
                    <img src={i.image} alt="sry" />
                  </div>
                  <div className='available'>{i.available}</div>
                </div>

                <div className='right'>
                  <div className='name'><b>{i.name}</b></div>
                  <div className='auther'> by <i>{i.auther}</i> </div>
                  <div className='price'><FaRupeeSign className='RS'></FaRupeeSign> {i.price}</div>
                </div>
              </div>

              <div className='pub'>
                <span><button onClick={() => { setdlt(true); setdeleteItem({ book: i.name, id: i._id }) }}>DELETE</button> <button onClick={() => { setupdate(true); setbook({ name: i.name, auther: i.auther, pub: pub, price: i.price, available: i.available, id: i._id }) }}>UPDATE</button></span>
              </div>

            </div>

          }

        }).reverse()
      }

      <div className='deleteProduct' style={{ display: dlt ? 'block' : 'none' }}>
        <h1>Do you want to REMOVE the book <div style={{ color: 'red' }}> {deleteItem.book} ? </div> </h1>

        <span>
          <button onClick={deleteProduct} >REMOVE</button>
          <button onClick={() => { setdlt(false) }}>CANCEL</button>
        </span>
      </div>


      <div className='updateProduct' style={{ display: update ? 'block' : 'none' }}>

        <form className='addDiv' onSubmit={updateProduct} >

          <div className='photo'>
            <img src={book.image} alt="book" className='img' />
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
              <select onChange={(e) => { setbook({ ...book, available: e.target.value }) }} >
                <option value="" >update book type</option>
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

            <button type="submit" className='AddBook'>Update Book</button>
            <button className='cancel' onClick={() => { setupdate(false) }}>CANCEL</button>
          </div>

          
        </form>
  
      </div>


    </div>
  )
}

export default Books