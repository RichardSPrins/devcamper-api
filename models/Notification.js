var mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  message: {type: String, required: true},
  readAt: {type: Date, default: Date.now}
}, {timestamps: true})

const Notification = mongoose.model('notification', NotificationSchema)

module.exports = Notification 