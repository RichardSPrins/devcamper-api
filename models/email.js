// //FIXME: This model is duplicated in the email service
// const mongoose = require('mongoose');
// const { EMAIL_TYPES } = require('../constants/main');

// const EmailSchema = mongoose.Schema({
//   _user            : {type: String, ref: 'user', required: true},
//   type             : {type: String, required: true, enum: EMAIL_TYPES},
//   sent             : {type: Boolean, default: false},
//   retries          : {type: Number, default: 0},
//   failed           : {type: Boolean, default: false},
// });

// const Email = mongoose.model('email', EmailSchema);

// module.exports = Email;
