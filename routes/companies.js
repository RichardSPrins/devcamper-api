const express = require('express')
const Company = require('../models/Company')
const User = require('../models/User')
const { protect, authorize } = require('../middleware/auth');


const { 
  getCompany,
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/companies')

const router = express.Router()

router
  .route('/')
  .get(getCompanies)
  .post(createCompany)

router
  .route('/:id')
  .get(getCompany)
  .put(updateCompany)
  .delete(deleteCompany)

  module.exports = router