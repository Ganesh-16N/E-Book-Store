import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaRupeeSign } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
let userId = localStorage.getItem('id')

function Kart() {
  const [list, setlist] = useState([])
  const [cart, setcart] = useState(false)
  const [dlt, setdlt] = useState(false)
  const location = useLocation()
  // const navigate = useNavigate()

  useEffect(() => {
    li()
  }, [location.state])

  const li = async () => {
    userId = userId.replace(/"+/g, "")
    await axios.get('http://localhost:4000/cart')
      .then((res) => {
        setlist(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addToBuy = async (i, image, available, name, auther, price, pub, pid) => {
    userId = userId.replace(/"+/g, "")
    console.log(i, image, available, name, auther, price, pub, pid)      // console.log(i);
    await axios.post('http://localhost:4000/buy', {
      userId: userId,
      price: price,
      bookId: i,
      image: image,
      available: available,
      name: name,
      auther: auther,
      pub: pub,
      pid: pid
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const dltBook = (i) => {

    axios.delete(`http://localhost:4000/dltbook/cart/${i}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      });

    setdlt(true)

    setTimeout(() => {
      window.location.reload()
    }, 500);
    // navigate(0)

  }


  return (
    list.map((i, ind) => {
      console.log(i.userId)

      return i.userId == userId && <div className='general'>


        <div className='mainCard' key={ind}>
          <div className='up'>
            <div className='left'>
              <div className='im' >
                <img src={i.image} loading="lazy" alt="image" />
              </div>
              <div className='available'>{i.available}</div>
            </div>
            <div className='right'>
              <div className='name'><b>{i.name}</b></div>
              <div className='auther'> by <i>{i.auther}</i> </div>
              <div className='price'><FaRupeeSign className='RS'></FaRupeeSign> {i.price}</div>
            </div>
          </div>
          <div>
            <div className='pub'>{i.pub}</div>
            <button onClick={() => { setcart(true); addToBuy(i._id, i.image, i.available, i.name, i.auther, i.price, i.pub, i.pid) }} className='cart' >Buy Now</button>
            <button className='cart' onClick={() => { dltBook(i._id) }}>Delete</button>
          </div>
        </div>



        <div className="deleteFromCart" style={{ display: dlt ? 'block' : 'none' }}>

          <h2>Deleted from cart !</h2>

          <div style={{ color: 'white' }}> {setTimeout(() => {
            setcart(false)
          }, 2000)}</div>
        </div>






      </div>





    }).reverse()
  )
}

export default Kart