const asyncHandler = require('../middleware/async')
const Candidate = require('../models/Candidate')
const ErrorResponse = require('../utils/errorResponse')

//  @desc     Get All Candidates
//  @route    GET /api/v1/candidates
//  @access   public
exports.getCandidates = async (req, res, next) => {
  const candidates = await Candidate.find()
  res.status(200).json({
    success: true,
    data: candidates
  })
}

exports.getCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id)
    if(!candidate){
      return res.status(404).json({
        success: false,
        message: 'This user was not found'
      })
    }

    res.status(200).json({
      success: true,
      data: candidate
    })
    
  } catch (error) {
    res.status(400).send(error)
    next()
  }
}

exports.createCandidate = async (req, res, next) => {

}

exports.updateCandidate = async (req, res, next) => {

}

exports.deleteCandidate = async (req, res, next) => {

}