const express = require('express');
// const workoutModel = require('../model/workoutModel');
const router = express.Router();
const { getAll, postOne, getOne, updateOne, deleteOne } = require('../controller/control')

express.json()  // optional

router.get('/', getAll)
router.post('/', postOne)
router.get('/:id', getOne) 
router.delete('/:id', deleteOne)
router.put('/:id', updateOne)

module.exports = router;
