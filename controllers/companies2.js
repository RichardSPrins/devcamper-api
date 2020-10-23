const asyncHandler = require('../middleware/async')
const Company = require('../models/Company')
const ErrorResponse = require('../utils/errorResponse')

//  @desc     Get All Companies
//  @route    GET /api/v1/companies
//  @access   public
exports.getCompanies = async (req, res, next) => {
  const companies = await Company.find()
  res.status(200).json({
    success: true,
    data: companies
  })
}

exports.getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id)
    if(!company){
      return res.status(404).json({
        success: false,
        message: 'This user was not found'
      })
    }

    res.status(200).json({
      success: true,
      data: company
    })
    
  } catch (error) {
    res.status(400).send(error)
    next()
  }
}

exports.createCompany = async (req, res, next) => {

}

exports.updateCompany = async (req, res, next) => {

}

exports.deleteCompany = async (req, res, next) => {

}

