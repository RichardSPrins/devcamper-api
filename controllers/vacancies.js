const asyncHandler = require('../middleware/async')
const Match = require('../models/Match')
const User = require('../models/User')
const Candidate = require('../models/Candidate')
const Company = require('../models/Company')
const Vacancy = require('../models/Vacancy')
const ErrorResponse = require('../utils/errorResponse')
const Recruiter = require('../models/recruiter')

//  @desc     Get All Matches
//  @route    GET /api/v1/matches
//  @access   public
exports.getMatches = async (req, res, next) => {
  const user = await req.user
  const role = user.role
  let profile;
  let matches = [];
  let matchesDetailList;
  switch(role){
    case 'candidate':
      profile = await Candidate.findById(user._candidate)
      matches = await Match.find({ _candidate: user._candidate})
      matchesDetailList = await Promise.all(matches.map( async match => {
        let vacancy = await Vacancy.findById(match._vacancy)
        let company = await Company.findById(match._company)
        return {
          match,
          candidate: profile,
          vacancy,
          company
        }
      }))
      break
    case 'company':
      profile = await Company.findById(user._company)
      matches = await Match.find({ _company: user._company})
      matchesDetailList = await Promise.all(matches.map( async match => {
        let vacancy = await Vacancy.findById(match._vacancy)
        let candidate = await Candidate.findById(match._candidate)
        return {
          match,
          company: profile,
          vacancy,
          candidate
        }
      }))
      break
    default: break
  }
  res.status(200).json(matchesDetailList)
}

exports.getMatch = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    const match = await Match.findById(req.params.id)
    const candidate = await Candidate.findById(match._candidate)
    const company = await Company.findById(match._company)
    const vacancy = await Vacancy.findById(match._vacancy)
    let matchObj = {}

    if(user._id == candidate.user || user._id == company.user){
      matchObj = {
        match,
        candidate,
        company,
        vacancy
      }
    }

    if(!match){
      return res.status(404).json({
        success: false,
        message: 'This matchdoes not exist'
      })
    }

    res.status(200).json({
      success: true,
      data: matchObj
    })
    
  } catch (error) {
    res.status(400).send(error)
    next()
  }
}

exports.createMatch = async (req, res, next) => {

}

exports.updateMatch = async (req, res, next) => {

}

exports.deleteMatch = async (req, res, next) => {

}