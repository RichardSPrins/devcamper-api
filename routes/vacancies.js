const express = require('express');
const {
  getVacancies,
  getVacancy,
  addVacancy,
  updateVacancy,
  deleteVacancy
} = require('../controllers/vacancies');

const Vacancy = require('../models/Vacancy');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Vacancy, {
      path: 'company',
      select: 'name description'
    }),
    getVacancies
  )
  .post(protect, authorize('company', 'admin'), addVacancy);

router
  .route('/:id')
  .get(getVacancy)
  .put(protect, authorize('company', 'admin'), updateVacancy)
  .delete(protect, authorize('company', 'admin'), deleteVacancy);

module.exports = router;
