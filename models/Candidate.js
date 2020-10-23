const matching = require('../constants/matching');
const constants = require('../constants/main');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CandidateSchema = Schema({
  user: { type: String, ref: 'user', required: true },
  firstName: { type: String },
  lastName: { type: String },
  active: { type: Boolean, default: true},
  completionProgress: {type: Number, default: 0},
  completeProfile: {type: Boolean, default: false},
  employments: [{ type: String, inclusion: matching.EMPLOYMENTS, default: [] }],
  // CURRENT_INDUSTRIES enums (1 page on onboarding)
  interestWorkingArea: { type: [String] },
  // CURRENT_JOBS (3 page on onboarding)
  recentJob: { type: String },
  // CURRENT_EXPERIENCE enums (2 page on onboarding)
  recentWorkingAreas: { type: [{parent: String, value: String}] },
  // VALUE_ASSESSMENTS enums (new page)
  values: [{type: String, enum: matching.VALUE_ASSESSMENTS, default: []}],
  recentAreaExperience: { type: String, required: true, enum: matching.EXPERIENCES },
  // PREFERRED_COPMANY_SIZE enums (page in onboarding)
  preferredCompanySize: { type: String, required: true, enum: matching.PREFERRED_COMPANY_SIZES },
  recentAnnualIncome: { type: String, required: false, enum: matching.RECENT_ANNUAL_INCOMES.concat(null) },
  avatar: { type: String, default: constants.DEFAULT_USER_AVATAR },
  skills: [{type: String}],
  resumeId: { type: String },
  resumeName: { type: String },
  workingExperience: [{
    companyName: { type: String },
    position: { type: String },
    location: { type: String },
    duty: { type: String },
    startWorkingAt: { type: String },
    endWorkingAt: { type: String },
    isCurrentJob: { type: Boolean, default: false},
  }],
  interests: [{
    image: { type: String },
    description: { type: String },
  }],
  highestDegree: {
    type: String,
    enum: matching.DEGREES,
  },
  personality: [{type: String}],
  education: [{
    schoolName: { type: String },
    specialty: { type: String },
    startStudyAt: { type: String },
    endStudyAt: { type: String },
    isCurrentSchool: { type: Boolean },
    degree: {
      type: String,
      enum: matching.DEGREES,
      default: matching.DEGREE.BACHELORS,
    },
  }],
  location: { type: String },
  locationCoordinates: {lat: {type: String}, lng: {type: String}},
  abilityToRelocate: { type: Boolean, default: false },
  socialMedia: {
    linkedInUrl: { type: String },
    twitterAcc: { type: String },
    faceBookUrl: { type: String },
  },
}, { timestamps: true });

CandidateSchema.virtual('brief').get(function () {
  const {
    avatar, location, firstName, lastName, recentWorkingAreas, socialMedia, resumeId,
  } = this;
  return {
    avatar, location, firstName, lastName, recentWorkingAreas, socialMedia, resumeId,
  };
});

const Candidate = mongoose.model('candidate', CandidateSchema);

module.exports = Candidate;
