const asyncHandler = require('../middleware/async')
const Match = require('../models/Match')
const User = require('../models/User')
const Candidate = require('../models/Candidate')
const Company = require('../models/Company')
const Vacancy = require('../models/Vacancy')
const ErrorResponse = require('../utils/errorResponse')
const Recruiter = require('../models/recruiter')
const { advancedMatchResults } = require('../middleware/advancedMatchResults')


//  @desc     Get All Matches
//  @route    GET /api/v1/matches
//  @access   public
exports.getUserMatches = async (req, res, next) => {
  try {
  res.status(200).json(res.advancedMatchResults)
  } catch (error) {
    res.status(400).json({message: 'You must be logged in to view matches.', error: error})
  }
}

exports.getApprovedMatches = async (req, res, next) => {
  try {
  res.status(200).json(res.advancedMatchResults)
  } catch (error) {
    res.status(400).json({message: 'You must be logged in to view matches.', error: error})
  }
}

exports.getMatch = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
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
        vacancy,
        isApproved: match.isApproved,
        isCompanyApproved: match.isCompanyApproved
      }
    }

    if (!match) {
      return next(
        new ErrorResponse(`No match with the id of ${req.params.id}`, 404)
      );
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

// @desc      Update match
// @route     PUT /api/v1/matches/:id
// @access    Private
exports.updateMatch = asyncHandler(async (req, res, next) => {
//   try {
//   const user = await User.findById(req.user.id)
//   const match = await Match.findById(req.params.id)
//   const candidate = await Candidate.findById(match._candidate)
//   const company = await Company.findById(match._company)
//   const vacancy = await Vacancy.findById(match._vacancy)

//   if(user._id == candidate.user || user._id == company.user){
//     matchObj = {
//       match,
//       candidate,
//       company,
//       vacancy,
//       isApproved: match.isApproved
//     }
//   }

//   if (!match) {
//     return next(
//       new ErrorResponse(`No match with the id of ${req.params.id}`, 404)
//     );
//   }

//   match = await Match.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   });

//   match.save()

//   req.status(200).json({

//   })
//   } catch (error) {
    
//   }
  
}) 

exports.deleteMatch = async (req, res, next) => {

}

// @desc      Update match approval
// @route     PUT /api/v1/matches/:id
// @access    Private
exports.approveMatch = asyncHandler(async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id)
    let match = await Match.findById(req.params.id)
    let matches = []
    let matchesDetailList = []
    let profile = {}
    
    if (!match) {
      return next(
        new ErrorResponse(`No match with the id of ${req.params.id}`, 404)
      );
    }
    console.log('match before modify', match)
    // updates document by setting 'isApproved' boolean to true
    match = await Match.findOneAndUpdate({_id: req.params.id}, {$set: {isApproved: true}}, )
    // save document
    match.save()

    match = await Match.findById(req.params.id)
    console.log('match after save', match)
    // check to see if match belongs to user, either candidate or company, construct match response object
    // if(user._id == candidate.user || user._id == company.user){
    //   matchObj = {
    //     match,
    //     candidate,
    //     company,
    //     vacancy,
    //     isApproved: match.isApproved
    //   }
    // }
    switch(user.role){
      case 'candidate':
        profile = await Candidate.findById(user.candidate)
        matches = await Match.find({ _candidate: user.candidate })
        matchesDetailList = await Promise.all(matches.map( async match => {
          let vacancy = await Vacancy.findById(match._vacancy)
          let company = await Company.findById(match._company)
          return {
            match,
            candidate: profile,
            vacancy,
            company,
            isApproved: match.isApproved,
            isCompanyApproved: match.isCompanyApproved
          }
        }))
        break
      case 'company':
        profile = await Company.findById(user.company)
        matches = await Match.find({ _company: user.company })
        matchesDetailList = await Promise.all(matches.map( async match => {
          let vacancy = await Vacancy.findById(match._vacancy)
          let candidate = await Candidate.findById(match._candidate)
          return {
            match,
            company: profile,
            vacancy,
            candidate,
            isApproved: match.isApproved,
            isCompanyApproved: match.isCompanyApproved
          }
        }))
        break
      case 'recruiter':
        console.log('recruiter')
        break
      default: break
    }

    
    res.status(200).json({
      success: true,
      data:matchesDetailList
    })
    
  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
}) 


// @desc      Update match approval
// @route     PUT /api/v1/matches/:id
// @access    Private
exports.unapproveMatch = asyncHandler(async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id)
    let match = await Match.findById(req.params.id)

    
    if (!match) {
      return next(
        new ErrorResponse(`No match with the id of ${req.params.id}`, 404)
      );
    }

    // updates document by setting 'isApproved' boolean to false
    match = await Match.findOneAndUpdate({_id: req.params.id}, {$set: {isApproved: false}}, )
    // save document
    match.save()

    match = await Match.findById(req.params.id)
    // check to see if match belongs to user, either candidate or company, construct match response object
    // if(user._id == candidate.user || user._id == company.user){
    //   matchObj = {
    //     match,
    //     candidate,
    //     company,
    //     vacancy,
    //     isApproved: match.isApproved
    //   }
    // }
    switch(user.role){
      case 'candidate':
        profile = await Candidate.findById(user.candidate)
        matches = await Match.find({ _candidate: user.candidate })
        matchesDetailList = await Promise.all(matches.map( async match => {
          let vacancy = await Vacancy.findById(match._vacancy)
          let company = await Company.findById(match._company)
          return {
            match,
            candidate: profile,
            vacancy,
            company,
            isApproved: match.isApproved,
            isCompanyApproved: match.isCompanyApproved
          }
        }))
        break
      case 'company':
        profile = await Company.findById(user.company)
        matches = await Match.find({ _company: user.company })
        matchesDetailList = await Promise.all(matches.map( async match => {
          let vacancy = await Vacancy.findById(match._vacancy)
          let candidate = await Candidate.findById(match._candidate)
          return {
            match,
            company: profile,
            vacancy,
            candidate,
            isApproved: match.isApproved,
            isCompanyApproved: match.isCompanyApproved
          }
        }))
        break
      case 'recruiter':
        console.log('recruiter')
        break
      default: break
    }

    res.status(200).json({
      success: true,
      data: matchesDetailList
    })
    
  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
}) 


// @desc      Update match approval for company
// @route     PUT /api/v1/matches/:id
// @access    Private
exports.companyApproveMatch = asyncHandler(async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id)
    let match = await Match.findById(req.params.id)
    let matches = []
    let matchesDetailList = []
    let profile = {}
    
    if (!match) {
      return next(
        new ErrorResponse(`No match with the id of ${req.params.id}`, 404)
      );
    }
    console.log('match before modify', match)
    // updates document by setting 'isApproved' boolean to true
    match = await Match.findOneAndUpdate({_id: req.params.id}, {$set: {isCompanyApproved: true}}, )
    // save document
    match.save()

    match = await Match.findById(req.params.id)
    console.log('match after save', match)
    // check to see if match belongs to user, either candidate or company, construct match response object
    // if(user._id == candidate.user || user._id == company.user){
    //   matchObj = {
    //     match,
    //     candidate,
    //     company,
    //     vacancy,
    //     isApproved: match.isApproved
    //   }
    // }
    switch(user.role){
      case 'candidate':
        profile = await Candidate.findById(user.candidate)
        matches = await Match.find({ _candidate: user.candidate })
        matchesDetailList = await Promise.all(matches.map( async match => {
          let vacancy = await Vacancy.findById(match._vacancy)
          let company = await Company.findById(match._company)
          return {
            match,
            candidate: profile,
            vacancy,
            company,
            isApproved: match.isApproved,
            isCompanyApproved: match.isCompanyApproved
          }
        }))
        break
      case 'company':
        profile = await Company.findById(user.company)
        matches = await Match.find({ _company: user.company })
        matchesDetailList = await Promise.all(matches.map( async match => {
          let vacancy = await Vacancy.findById(match._vacancy)
          let candidate = await Candidate.findById(match._candidate)
          return {
            match,
            company: profile,
            vacancy,
            candidate,
            isApproved: match.isApproved,
            isCompanyApproved: match.isCompanyApproved
          }
        }))
        break
      case 'recruiter':
        console.log('recruiter')
        break
      default: break
    }

    
    res.status(200).json({
      success: true,
      data:matchesDetailList
    })
    
  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
}) 


// @desc      Update match approval for company
// @route     PUT /api/v1/matches/:id
// @access    Private
exports.companyUnapproveMatch = asyncHandler(async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id)
    let match = await Match.findById(req.params.id)

    
    if (!match) {
      return next(
        new ErrorResponse(`No match with the id of ${req.params.id}`, 404)
      );
    }

    // updates document by setting 'isApproved' boolean to false
    match = await Match.findOneAndUpdate({_id: req.params.id}, {$set: {isCompanyApproved: false}}, )
    // save document
    match.save()

    match = await Match.findById(req.params.id)
    // check to see if match belongs to user, either candidate or company, construct match response object
    // if(user._id == candidate.user || user._id == company.user){
    //   matchObj = {
    //     match,
    //     candidate,
    //     company,
    //     vacancy,
    //     isApproved: match.isApproved
    //   }
    // }
    switch(user.role){
      case 'candidate':
        profile = await Candidate.findById(user.candidate)
        matches = await Match.find({ _candidate: user.candidate })
        matchesDetailList = await Promise.all(matches.map( async match => {
          let vacancy = await Vacancy.findById(match._vacancy)
          let company = await Company.findById(match._company)
          return {
            match,
            candidate: profile,
            vacancy,
            company,
            isApproved: match.isApproved,
            isCompanyApproved: match.isCompanyApproved
          }
        }))
        break
      case 'company':
        profile = await Company.findById(user.company)
        matches = await Match.find({ _company: user.company })
        matchesDetailList = await Promise.all(matches.map( async match => {
          let vacancy = await Vacancy.findById(match._vacancy)
          let candidate = await Candidate.findById(match._candidate)
          return {
            match,
            company: profile,
            vacancy,
            candidate,
            isApproved: match.isApproved,
            isCompanyApproved: match.isCompanyApproved
          }
        }))
        break
      case 'recruiter':
        console.log('recruiter')
        break
      default: break
    }

    res.status(200).json({
      success: true,
      data: matchesDetailList
    })
    
  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
}) 
