require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()

const register  = require('./controller/control')



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, parameterLimit:100000, limit:"500mb" }))
app.use('/', (req, res, next) => {
    console.log(req.path, req.method);
    next()
})
 
app.use(express.json())
 
app.use('/uploads', express.static('uploads'))

app.use('/', register)
mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err);
    })




