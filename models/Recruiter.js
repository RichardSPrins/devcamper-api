var CONSTANTS = require('../constants/main');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var RecruiterSchema = new Schema({
  // required fields
  company : {type: String, ref: 'company', required: true},
  user    : {type: String, ref: 'user', required: true},
  fullName: {type: String, required: true},
  // optional fields
  avatar             : {type: String, default: CONSTANTS.DEFAULT_USER_AVATAR},
  position           : {type: String},
},{timestamps:true});

RecruiterSchema.virtual.fullName = () => firstName + lastName

var Recruiter = mongoose.model('recruiter', RecruiterSchema);

module.exports = Recruiter;
