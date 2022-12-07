

import { Link, useNavigate, useLocation  } from 'react-router-dom'
import React, { useEffect, useState} from 'react'
import axios from 'axios'
import img from './advimg.jpg'
import { FaRupeeSign, FaSearch } from 'react-icons/fa'

let userId = localStorage.getItem('id')




const Wellcome = () => {
  const [list, setlist] = useState([])
  const [search, setsearch] = useState("")
  const [bookType, setbookType] = useState("")
  const [cart, setcart] = useState(false)
  const location = useLocation()
  const [srt, setsrt] = useState(false)


  useEffect(() => {
    li()
      }, [location.state])
    
      const li = async () => {
       await axios.get('http://localhost:4000')
         .then((res) => {
           setlist(res.data)
           //  return list
         })
         .catch((err) => {
           console.log(err)
         })
    }

  const types = document.querySelectorAll('.book')

  types.forEach(books => {
    types.forEach(book => {
      book.addEventListener('click', (e) => {
        books.classList.remove('active')
        let selected = e.target
        selected.classList.add('active')
      })
    })
  })

  const addToCart=async(i,image,available,name,auther,price,pub,pid)=>{
    userId = userId.replace(/"+/g, "")
    console.log(i);
    await axios.post('http://localhost:4000/cart', {
      userId: userId,
      bookId: i,
      image: image,
      available: available,
      name:name,
      auther:auther,
      price:price,
      pub:pub,
      pid: pid
    })
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }


   //adv images animation

   const page = document.querySelectorAll(".page");
   let n = 0;
   
   // manual
   page.forEach((p) => {
     p.addEventListener("click", () => {
       page.forEach((pgs, idx) => {
         pgs.classList.remove("active");
         n = idx 
       });
       p.classList.add("active");
     });
   })
   
    || 
   //  automization
    fun(n);
   function fun(n) {
     console.log(page[n]);
     page.forEach((pgs) => {
       pgs.classList.remove("active");
       page[n].classList.add('active'); 
     });
     setTimeout(() => {
       if (n == 3) {
         n = -1;
       }
       fun(n + 1); 
     }, 5500);
   }


  return (
    <div className='welcome' >
   {
  //   <div className='nav'>
  //   <span><Link to='/login' className='log'>Login</Link></span>
  //   <span><Link to='/plogin' className='sign'>Become A Seller</Link></span>
  // </div>
   }
      <div id='home'>

        <input type="text" onChange={(e) => { setsearch(e.target.value) }} className='search' placeholder='search by book, auther, publication' />


        <nav className='bookTypes' id='types'>
          <button value="" className='book active' onClick={(e) => { setbookType(e.target.value) }} >All</button>
          <button value="Novel" className='book' onClick={(e) => { setbookType(e.target.value) }} >Novel</button>
          <button value="Sci-Fi" className='book' onClick={(e) => { setbookType(e.target.value) }}>Sci-Fi</button>
          <button value="Comics" className='book' onClick={(e) => { setbookType(e.target.value) }}>Comics</button>
          <button value="bio-G" className='book' onClick={(e) => { setbookType(e.target.value) }}>Biography</button>
          <button value="History" className='book' onClick={(e) => { setbookType(e.target.value) }}>History</button>
          <button value="Horror" className='book' onClick={(e) => { setbookType(e.target.value) }}>Horror</button>
          <button value="Other" className='book' onClick={(e) => { setbookType(e.target.value) }}>Other</button>
        </nav>

        {
          // search.toLowerCase() == '' && bookType == '' ?
          // <div className='h'>
          //   <h1>adv</h1>
          // </div> : null
        }

        {
          search.toLowerCase() == '' && bookType == '' ?
        <div >
            
        <div class="pages">
        <div class="page active">
          <div className="img panel1"></div>
        </div>
        <div class="page">
          <div className="img panel2"></div>
        </div>
        <div class="page">
          <div className="img panel3"></div>
        </div>
        <div class="page">
          <div className="img panel4"></div>
        </div>
      </div>

          <h2 className='heading'>Novels : </h2>
          <div className='firstRow'>
          
          { 
            list.map((i, ind)=>{
              return i.available.toLowerCase().includes('novel') &&

              <div>

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
                  <button onClick={()=>{setcart(true); addToCart(i._id, i.image, i.available, i.name, i.auther, i.price, i.pub, i.pid)}} className='cart' >Add to Cart</button> 
                  </div>
                  </div>
  
  
                </div>
            }).reverse()
          }
          </div>

          <h2 className='heading'>Science-Fiction : </h2>
          <div className='firstRow'>
          {
            list.map((i, ind)=>{
              return i.available.toLowerCase().includes('sci-fi') &&

              <div>

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
                  <button onClick={()=>{setcart(true); addToCart(i._id, i.image, i.available, i.name, i.auther, i.price, i.pub, i.pid)}} className='cart' >Add to Cart</button> 
                  </div>
                  </div>
  
  
                </div>
            }).reverse()
          }
          </div>


          <h2 className='heading'>Comics : </h2>

          <div className='firstRow'>
          {
            list.map((i, ind)=>{
              return i.available.toLowerCase().includes('comics') &&

              <div>

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
                  <button onClick={()=>{setcart(true); addToCart(i._id, i.image, i.available, i.name, i.auther, i.price, i.pub, i.pid)}} className='cart' >Add to Cart</button> 
                  </div>
                </div>
  
  
                </div>
            }).reverse()
          }
          </div>

          <h2 className='heading'>Biography : </h2>

          <div className='firstRow'>
          {
            list.map((i, ind)=>{
              return i.available.toLowerCase().includes('bio-g') &&

              <div>

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
                  <button onClick={()=>{setcart(true); addToCart(i._id, i.image, i.available, i.name, i.auther, i.price, i.pub, i.pid)}} className='cart' >Add to Cart</button> 
                  </div>
                  </div>
  
  
                </div>
            }).reverse()
          }
          </div>

          <h2 className='heading'>History : </h2>

          <div className='firstRow'>
          {
            list.map((i, ind)=>{
              return i.available.toLowerCase().includes('history') &&

              <div>

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
                  <button onClick={()=>{setcart(true); addToCart(i._id, i.image, i.available, i.name, i.auther, i.price, i.pub, i.pid)}} className='cart' >Add to Cart</button> 
                  </div>
                  </div>
  
  
                </div>
            }).reverse()
          }
          </div>

          <h2 className='heading'>Horror : </h2>

          <div className='firstRow'>
          {
            list.map((i, ind)=>{
              return i.available.toLowerCase().includes('horror') &&

              <div>

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
                  <button onClick={()=>{setcart(true); addToCart(i._id, i.image, i.available, i.name, i.auther, i.price, i.pub, i.pid)}} className='cart' >Add to Cart</button> 
                  </div> 
                  </div>
  
  
                </div>
            }).reverse()
          }
          </div>

          <h2 className='heading'>Other : </h2>

          <div className='firstRow'>
          {
            list.map((i, ind)=>{
              return i.available.toLowerCase().includes('other') &&

              <div>

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
                  <button onClick={()=>{setcart(true); addToCart(i._id, i.image, i.available, i.name, i.auther, i.price, i.pub, i.pid)}} className='cart' >Add to Cart</button> 
                  </div>
                  </div>
  
  
                </div>
            }).reverse()
          }
          </div>






        </div>
        
        : 
          list.map((i, ind) => {
            return i.available.toLowerCase().includes(bookType.toLowerCase()) && (i.name.toLowerCase().includes(search.toLowerCase()) || i.auther.toLowerCase().includes(search.toLowerCase()) || i.pub.toLowerCase().includes(search.toLowerCase())) &&

            <div className='general'>


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
                <button onClick={()=>{setcart(true); addToCart(i._id, i.image, i.available, i.name, i.auther, i.price, i.pub, i.pid)}} className='cart' >Add to Cart</button> 
                </div>
                  </div>



              </div>
          }).reverse()
        }
      </div>



      <div className="addedProduct" style={{display:cart?'block':'none'}}>
      
      <h2>Added to the cart !</h2>

    <div style={{color:'white'}}> { setTimeout(() => {
      setcart(false)
    }, 1000)}</div>
      </div>
    </div>
  )
}









export default Wellcome






