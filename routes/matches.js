const express = require('express')
const Match = require('../models/Match')
const User = require('../models/User')
const { protect, authorize } = require('../middleware/auth');
const {advancedMatchResults} = require('../middleware/advancedMatchResults')


const {
  getMatch,
  getUserMatches,
  getApprovedMatches,
  createMatch,
  updateMatch,
  deleteMatch,
  companyApproveMatch,
  companyUnapproveMatch,
  approveMatch,
  unapproveMatch
} = require('../controllers/matches')

const router = express.Router()

router
  .route('/')
  .get(protect, advancedMatchResults(), getUserMatches)
  .post(protect, createMatch)

// router
//   .route('/approved')
//   .get(protect,advancedMatchResults(), getApprovedMatches)

router
  .route('/:id/approve')
  .post(protect, approveMatch)

router
  .route('/:id/unapprove')
  .post(protect, unapproveMatch)

  router
  .route('/:id/companyapprove')
  .post(protect, companyApproveMatch)

router
  .route('/:id/companyunapprove')
  .post(protect, companyUnapproveMatch)

router
  .route('/:id')
  .get(protect, getMatch)
  .put(protect, updateMatch)
  .delete(protect, deleteMatch)

module.exports = router