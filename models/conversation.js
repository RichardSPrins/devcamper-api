// // const CONSTANTS = require('../constants/main');
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const { uuid } = require('uuidv4');

// const ConversationSchema = Schema({
//     _id: {type: String, default: uuid},

//     // required fields
//     vacancy  : {type: String, ref: 'vacancy', required: true},
//     recruiter: {type: String, ref: 'user', required: true},
//     candidate: {type: String, ref: 'user', required: true},

//     // default
//     messages: [{type: String, ref: 'message', default: []}]
// });

// const Conversation = mongoose.model('conversation', ConversationSchema);

// module.exports = Conversation;
