var matching = require('../constants/matching');
var constants = require('../constants/main');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    user: { type: String, ref: 'user', required: true },
    name: { type: String, unique: true },
    type: { type: [String] },
    foundDate: { type: String },
    employeesAmount: { type: String },
    recruiters: [{ type: String, ref: 'recruiter'}],
    headquartersLocation: { type: String },
    headquartersCoordinates: { lat: { type: String }, lng: { type: String } },
    values: [{ type: String, default: [] }],
    socialMedia: {
        websiteUrl: { type: String, },
        linkedInUrl: { type: String/*, required: true*/ },
        twitterAcc: { type: String/*, required: true*/ },
        facebookUrl: { type: String/*, required: true*/ }
    },
    // optional fields
    locationOffices: [{
        location: { type: String },
    }],
    logo: { type: String, default: constants.DEFAULT_COMPANY_LOGO },
    background: { type: String, default: constants.DEFAULT_COMPANY_LOGO },
    images: [{ type: String }],
    description: { type: String },
    motto: { type: String },
    registerAt: { type: Date, default: () => new Date() },
    isPremium: { type: Boolean, default: false },
    isFilled: { type: Boolean, default: false },
    fillSteps: [{ type: String, enum: constants.COMPANY_FILL_STEPS }],
    fillProgress: { type: Number, min: 0, max: 100, default: 0 }
}, { timestamps: true });


CompanySchema.virtual('brief').get(function() {
    const {name, type, foundDate, logo, background, headquartersLocation, socialMedia} = this;
    return {name, type, foundDate, logo, background, headquartersLocation, socialMedia};
})

const Company = mongoose.model('company', CompanySchema);

module.exports = Company;
