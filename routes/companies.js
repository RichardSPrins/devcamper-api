const express = require('express');
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompanyProfile,
  deleteCompanyProfile,
  getCompaniesInRadius,
  companyPhotoUpload
} = require('../controllers/companies');

// Include other resource routers
const vacancyRouter = require('./vacancies');
const reviewRouter = require('./reviews');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
const Company = require('../models/Company');

// // Re-route into other resource routers
router.use('/:companyId/vacancies', vacancyRouter);
// router.use('/:bootcampId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getCompaniesInRadius);

router
  .route('/:id/photo')
  .put(protect, authorize('company', 'admin'), companyPhotoUpload);

router
  .route('/')
  .get(advancedResults(Company, 'vacancies'), getCompanies)
  .post(protect, authorize('company', 'admin'), createCompany);

router
  .route('/:id')
  .get(getCompany)
  .put(protect, authorize('company', 'admin'), updateCompanyProfile)
  .delete(protect, authorize('company', 'admin'), deleteCompanyProfile);

module.exports = router;
