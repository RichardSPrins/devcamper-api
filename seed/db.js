const FIXTURES = require('./fixtures')
var seeder = require('mongoose-seed');
const MatchingService = require('../services/matchingService')
const async = require('async');

var mongoose = require('mongoose');
mongoose.set('bufferCommands', false);
mongoose.Promise = global.Promise

console.log("Beginning seed...");

var modelPaths = [
  './models/user',
  './models/candidate',
  './models/company',
  './models/recruiter',
  './models/vacancy',
];

var models = ['user','candidate','company','recruiter','vacancy'];

var data = [
  {
    'model': 'user',
    'documents': FIXTURES.USERS
  },
  {
    'model': 'candidate',
    'documents': FIXTURES.CANDIDATES
  },
  {
    'model': 'company',
    'documents': FIXTURES.COMPANIES
  },
  {
    'model': 'recruiter',
    'documents': FIXTURES.RECRUITERS
  },
  {
    'model': 'vacancy',
    'documents': FIXTURES.VACANCIES
  },
];

// Connect to MongoDB via Mongoose
async.series([function(cb){
  seeder.connect('mongodb://localhost/sample-dev',{useMongoClient: true}, function() {
    // Load Mongoose models
    seeder.loadModels(modelPaths);
    // Clear specified collections
    seeder.clearModels(models, function() {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function() {
        console.log('done seeding');
        seeder.disconnect();
        cb();
      });
    });
  })},

  function(cb) {
    console.log('attempting to connect to mongo');
    mongoose.connect('mongodb://localhost/sample-dev',{useMongoClient: true},
      function() {
        console.log('connected');
        cb();
    })
  },

  function(cb) {
    console.log('starting matching');
    MatchingService.updateAll(function(err){
      if (err) {
        console.log(err)
      }
      console.log('Updated and filtered matchings')
      cb();
    })
  },

  function(cb) {
    console.log('done matching');
    mongoose.disconnect();
    cb();
  }
])

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
