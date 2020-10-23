const asyncHandler = require('../middleware/async')
const Match = require('../models/Match')
const User = require('../models/User')
const Candidate = require('../models/Candidate')
const Company = require('../models/Company')
const Vacancy = require('../models/Vacancy')
const ErrorResponse = require('../utils/errorResponse')
const Recruiter = require('../models/recruiter')
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc      Get vacancies
// @route     GET /api/v1/vacancies
// @route     GET /api/v1/companies/:companyId/vacancies
// @access    Public

exports.getVacancies = asyncHandler(async (req, res, next) => {
  if (req.params.companyId) {

    const vacancies = await Vacancy.find({ company: req.params.companyId });
    // console.log(vacancies)
    return res.status(200).json({
      success: true,
      count: vacancies.length,
      data: vacancies
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single vacancy
// @route     GET /api/v1/vacancies/:id
// @access    Public
exports.getVacancy = asyncHandler(async (req, res, next) => {
  const vacancy = await Vacancy.findById(req.params.id).populate({
    path: 'company',
    select: 'name description CEO'
  });

  if (!vacancy) {
    return next(
      new ErrorResponse(`No vacancy with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: vacancy
  });
});

// @desc      Add vacancy
// @route     POST /api/v1/companies/:companyId/vacancies
// @access    Private
exports.addVacancy = asyncHandler(async (req, res, next) => {
  req.body._company = req.params.companyId;
  // req.body.user = req.user.id;

  const company = await Company.findById(req.params.companyId);

  if (!company) {
    return next(
      new ErrorResponse(
        `No company with the id of ${req.params.companyId}`,
        404
      )
    );
  }

  // Make sure user is bootcamp owner
  if (company.user.toString() !== req.user.id/* && req.user.role !== 'admin'*/) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a course to company ${company._id}`,
        401
      )
    );
  }

  const vacancy = await Vacancy.create(req.body);

  res.status(200).json({
    success: true,
    data: vacancy
  });
});

// @desc      Update vacancy
// @route     PUT /api/v1/vacancies/:id
// @access    Private
exports.updateVacancy = asyncHandler(async (req, res, next) => {
  let vacancy = await Vacancy.findById(req.params.id);
  console.log(vacancy)

  if (!vacancy) {
    return next(
      new ErrorResponse(`No vacancy with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is vacancy owner
  if (vacancy.company.toString() !== req.user.company/* && req.user.role !== 'admin'*/) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update vacancy ${vacancy._id}`,
        401
      )
    );
  }

  vacancy = await Vacancy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  vacancy.save();

  res.status(200).json({
    success: true,
    data: vacancy
  });
});

// @desc      Delete vacancy
// @route     DELETE /api/v1/vacancies/:id
// @access    Private
exports.deleteVacancy = asyncHandler(async (req, res, next) => {
  const vacancy = await Vacancy.findById(req.params.id);

  if (!vacancy) {
    return next(
      new ErrorResponse(`No vacancy with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is vacancy owner
  if (vacancy._company.toString() !== req.user._company/* && req.user.role !== 'admin'*/) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete vacancy ${vacancy._id}`,
        401
      )
    );
  }

  await vacancy.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});


