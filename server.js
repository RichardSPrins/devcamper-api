const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')

const adminBro = new AdminBro({
  databases: [],
  rootPath: '/admin',
})

const adminBroRouter = AdminBroExpress.buildRouter(adminBro)
// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const bootcamps = require('./routes/bootcamps');
const vacancies = require('./routes/vacancies')
const courses = require('./routes/courses');
const matches = require('./routes/matches')
const reviews = require('./routes/reviews');
const candidates = require('./routes/candidates');
const companies = require('./routes/companies')


const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use(adminBro.options.rootPath, adminBroRouter)
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/candidates', candidates);
app.use('/api/v1/companies', companies);
app.use('/api/v1/matches', matches);
app.use('/api/v1/vacancies', vacancies)
// app.use('/api/v1/bootcamps', bootcamps); 
app.use('/api/v1/courses', courses);
app.use('/api/v1/reviews', reviews);

app.use(errorHandler);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
