var matching = require('../constants/matching');
var constants = require('../constants/main');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    user: { type: String, ref: 'user', required: true },
    name: { type: String },
    type: { type: String },
    foundDate: { type: String },
    employeesAmount: { type: String },
    recruiters: [{ type: mongoose.Types.ObjectId, ref: 'recruiter' }],
    headquartersLocation: { type: String },
    headquartersCoordinates: { lat: { type: String }, lng: { type: String } },
    values: [{ type: String, default: [] }],
    socialMedia: {
        websiteUrl: { type: String, },
        linkedInUrl: { type: String },
        twitterAcc: { type: String },
        facebookUrl: { type: String }
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


CompanySchema.pre('remove', async function (next) {
    console.log(`Vacancies being removed from company ${this._id}`);
    await this.model('vacancy').deleteMany({ company: this._id });
    next();
});

CompanySchema.virtual('vacancies', {
    ref: 'vacancy',
    localField: '_id',
    foreignField: 'company',
    justOne: false
});

CompanySchema.virtual('brief').get(function () {
    const { name, type, foundDate, logo, background, headquartersLocation, socialMedia } = this;
    return { name, type, foundDate, logo, background, headquartersLocation, socialMedia };
})
const Company = mongoose.model('company', CompanySchema);

module.exports = Company;