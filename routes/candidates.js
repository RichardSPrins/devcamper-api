const express = require('express')
const Candidate = require('../models/Candidate')
const User = require('../models/User')
const { protect, authorize } = require('../middleware/auth');


const { 
  getCandidate,
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate
} = require('../controllers/candidates')

const router = express.Router()

router
  .route('/')
  .get(getCandidates)
  .post(createCandidate)

router
  .route('/:id')
  .get(getCandidate)
  .put(updateCandidate)
  .delete(deleteCandidate)

  module.exports = router