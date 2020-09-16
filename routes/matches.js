const express = require('express')
const Match = require('../models/Match')
const User = require('../models/User')
const { protect, authorize } = require('../middleware/auth');


const { 
  getMatch,
  getMatches,
  createMatch,
  updateMatch,
  deleteMatch
} = require('../controllers/matches')

const router = express.Router()

router
  .route('/')
  .get(protect, getMatches)
  .post(protect, createMatch)

router
  .route('/:id')
  .get(protect, getMatch)
  .put(protect, updateMatch)
  .delete(protect, deleteMatch)

module.exports = router