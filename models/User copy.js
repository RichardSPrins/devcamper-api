const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");
// const { uuid } = require('uuidv4')

const userSchema = new mongoose.Schema(
  {
    // _id: {type: String, default: uuid.v4},
    email: { type: String, trim: true, unique: true, required: "Email is required"},
    model            : {type: String, default: null},
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    role: {type: String, enum: ['candidate', 'company', 'recruiter', 'admin'] },
    isApproved       : {type: Boolean, default: false},
    isRejected       : {type: Boolean, default: false},
    isConfirmed      : {type: Boolean, default: false},
    isFinished      : {type: Boolean, default: false},
    avatar: { type: String, required: "Avatar image is required", default: "/static/images/profile-image.jpg"},
    restorePassToken : {type: String, default: null, access: 'private'},
    confirmEmailToken: {type: String, default: null, access: 'private'},
    _candidate       : {type: String, ref: 'candidate'},
    _recruiter       : {type: String, ref: 'recruiter'},
    _company         : {type: String, ref: 'company'},
    // for data/authentication with linked in
    linkedInData: {}
  },
  { timestamps: true }
);

const autoPopulateFollowingAndFollowers = function(next) {
  this.populate("following", "_id avatar");
  this.populate("followers", "_id avatar");
  next();
};

userSchema.pre("findOne", autoPopulateFollowingAndFollowers);

/* passportLocalMongoose takes our User schema and sets up a passport "local" authentication strategy using our email as the username field */
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
userSchema.plugin(mongodbErrorHandler);

// UserSchema.virtual("profile").get(function() {
//   return { email: this.email
//       , isCandidate : this.role === ROLES.CANDIDATE
//       , isRecruiter : this.role === ROLES.RECRUITER
//       , isNotApproved : !this.isApproved
//       , isFinished : this.isFinished }
// })

// UserSchema.virtual('brief').get(function() {
//   const {email, isApproved} = this;
//   return {email, isApproved}

module.exports = mongoose.model("User", userSchema);
