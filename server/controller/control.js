
const usersModel = require('../model/model')
const mongoose = require('mongoose')
const express = require('express')
const user = express.Router()
// var nodemailer = require('nodemailer');
const bookModel = require('../model/BookModel')
const publication = require('../model/PubModel')
const cartModel = require('../model/cartModel')
const buyModel = require('../model/baughtModel')

const multer = require('multer')









const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads")
    }, filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
  })
})

user.post('/signup', async (req, res) => {
  try {
    const tata = await usersModel.create({ name: req.body.name, email: req.body.email, pass: req.body.pass })
    let result = await tata.save()
    result = result.toObject()
    delete result.pass
    res.status(200).send(result)
  } catch (err) {
    res.status(404).send(err)
  }
})


user.post('/psignup', async (req, res) => {
  try {
    const tata = await publication.create({ name: req.body.name, email: req.body.email, pass: req.body.pass })
    let result = await tata.save()
    result = result.toObject()
    delete result.pass
    res.status(200).send(result)
  } catch (err) {
    res.status(404).send(err)
  }
})


user.post('/login', async (req, res) => {
  try {
    const result = await usersModel.findOne({ email: req.body.email, pass: req.body.pass }).select('-pass')

    if (result) {
      res.status(200).send(result)
    } else {
      res.status(200).send("user not found")
    }
  } catch (err) {
    res.status(404).send(err)
  }
})

user.post('/plogin', async (req, res) => {
  try {
    const result = await publication.findOne({ email: req.body.email, pass: req.body.pass }).select('-pass')

    if (result) {
      res.status(200).send(result)
    } else {
      res.status(200).send("publication not found")
    }
  } catch (err) {
    res.status(404).send(err)
  }
})








let imageCode = 'image-1668934156389.jpg'

user.post('/img', upload.single('image'), (req, res) => {
  imageCode = req.file.filename
  res.status(200).send(imageCode)
  console.log(imageCode)
})

user.post('/add', async (req, res) => {
  try {
    const tata = await bookModel.create({  
      available: req.body.available, name: req.body.name, pid: req.body.pid, auther: req.body.auther, pub: req.body.pub, price: req.body.price,
      image: `http://localhost:4000/uploads/${imageCode}`
    })
 
    let result = await tata.save()
    result = result.toObject()
    res.status(200).send(result)

  } catch (err) {
    res.status(404).send(err)
  }
})
// available: req.body.available, name: req.body.name, pid: req.body.pid, auther: req.body.auther, pub: req.body.pub, price: req.body.price,
// image: `http://localhost:4000/uploads/${imageCode}`
user.put('/add/:id', async (req, res) => {
  try {
    const tata = await bookModel.updateOne(
     {_id : req.params.id},{
      $set : req.body
     }
    )

    // let result = await tata.save()
    // result = result.toObject()
    res.status(200).send(tata)

  } catch (err) {
    res.status(404).send(err)
  }
})
user.get('/', async (req, res) => {
  try {
    const tata = await bookModel.find()
    res.status(200).send(tata)

  } catch (err) {
    res.status(404).send(err)
  }
})

user.delete('/dltbook/:id', async (req, res) => {
  try {
    const tata = await bookModel.deleteOne({_id:req.params.id})
    res.status(200).send(tata)

  } catch (err) {
    res.status(404).send(err)
  }
})



user.get('/pbooks', async (req, res) => {
  try {
    const tata = await bookModel.find()
    res.status(200).send(tata)

  } catch (err) {
    res.status(404).send(err)
  }
})






user.post('/cart', async (req, res) => {
  try {
    let combinedId = (req.body.userId) + (req.body.bookId) ;
    const tata = await cartModel.create({
     userId : req.body.userId,
     bookId: req.body.bookId, available: req.body.available, name: req.body.name, pid: req.body.pid, auther: req.body.auther, pub: req.body.pub, price: req.body.price,
     combinedId : combinedId
    })

    let result = await tata.save()
    result = result.toObject()
    res.status(200).send(result)

  } catch (err) {
    res.status(404).send(err)
  }
})


user.delete('/dltbook/cart/:id', async (req, res) => {
  try {
    const tata = await cartModel.deleteOne({_id:req.params.id})
    res.status(200).send(tata)

  } catch (err) {
    res.status(404).send(err)
  }
})


user.get('/cart', async (req, res) => {
  try {
    const tata = await cartModel.find()
    res.status(200).send(tata)

  } catch (err) {
    res.status(404).send(err)
  }
})

user.post('/buy', async (req, res) => {
  try {
    let combinedId = (req.body.userId) + (req.body.bookId) ;
    const tata = await buyModel.create({
     userId : req.body.userId,
     bookId: req.body.bookId, available: req.body.available, name: req.body.name, pid: req.body.pid, auther: req.body.auther, pub: req.body.pub, price: req.body.price,
     combinedId:combinedId
    })

    let result = await tata.save()
    result = result.toObject()
    res.status(200).send(result)

  } catch (err) {
    res.status(404).send(err)
  }
})


user.get('/buy', async (req, res) => {
  try {
    const tata = await buyModel.find()
    res.status(200).send(tata)

  } catch (err) {
    res.status(404).send(err)
  }
})


user.delete('/dltbook/buy/:id', async (req, res) => {
  try {
    const tata = await buyModel.deleteOne({_id:req.params.id})
    res.status(200).send(tata)

  } catch (err) {
    res.status(404).send(err)
  }
})









module.exports = user


