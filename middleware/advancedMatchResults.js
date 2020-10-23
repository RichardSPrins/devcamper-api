const Candidate = require('../models/Candidate')
const Company = require('../models/Company')
const Match = require('../models/Match')
const Vacancy = require('../models/Vacancy')


exports.advancedMatchResults = () => async (req, res, next) => {
  let params = { ...req.query}
  console.log(Boolean(params))
  const user = req.user;
  // console.log(user)
  const role = user.role;
  // console.log(role)
  let profile = {};
  let matches = []
  let matchesDetailList = []
  switch(role){
    case 'candidate':
      profile = await Candidate.findById(user.candidate)
      if(params.isApproved){
        matches = await Match.find({_candidate: user.candidate, isApproved: true})
      } else {
        matches = await Match.find({ _candidate: user.candidate})
      }
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
      if(params.isApproved){
        matches = await Match.find({ _company: user.company, isApproved: true})
      } else {
        matches = await Match.find({ _company: user.company})
      }
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
    default: break
  }
  // console.log(matchesDetailList)
  res.advancedMatchResults = matchesDetailList
  next()
}