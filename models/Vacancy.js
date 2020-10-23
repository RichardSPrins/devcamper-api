var matching = require('../constants/matching');
var constants = require('../constants/main');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var brief = {type: Schema.Types.Mixed}

var VacancySchema = Schema({
    title: {type: String, required: true},
    // CURRENT_INDUSTRIES enums
    industries      : {type: [{parent: String, value: String}], required: true},
    salary   : {type: String, enum: matching.RECENT_ANNUAL_INCOMES, required: true},
    company  : {type: String, ref: 'company', required: true},
    recruiter: {type: String, ref: 'recruiter', required: true},
    // we gonna compare this field with users total experience field
    experience: {type: String, enum: matching.EXPERIENCES.concat(null), default: null},
    degree    : {type: String, enum: matching.DEGREES.concat(null), default: null},
    employment: [{type: String}],
    description: {type: String, default: null},
    location           : [{type: String, required: true}],
    locationCoordinates: {lat: {type: String}, lng: {type: String}},
    locations          : [{lat: {type: String}, lng: {type: String}}],
    status          : {type: String, enum: constants.VACANCY_STATUSES, default: constants.VACANCY_STATUS.DRAFT},
    responsibilities: [{type: String, default: [] }],
    requirements    : [{type: String, default: [] }],
    candidates: {
        count: {type: Number, min: 0, default: 0},
        briefs: [ brief ]
    },
    // company: { brief },
		publishedAt: { type: Date},
		closedAt: { type: Date},
		closeFormResponse: { type: String },
    keywords: {type: String},
},{timestamps:true});

VacancySchema.virtual('brief').get(function() {
    var {title, location, status, industries, salary, employment, experience, degree, description} = this;
    return {title, location, status, industries, salary, employment, experience, degree, description}
})

var Vacancy = mongoose.model('vacancy', VacancySchema);

module.exports = Vacancy;
