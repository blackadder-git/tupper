// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
//var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();

// get connection uri
const uri = process.env.MONGODB_URI;

// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
const productRoutes = require('./server/routes/products');
//const tagRoutes = require('./server/routes/tags');
//const categoryRoutes = require('./server/routes/categories');


// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ... 
var app = express(); // create an instance of express

// map all other (non-defined) routes back to the index page
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render("index");
});

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  // allow requests from any domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  // allow additional headers
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  // allow what HTTP actions are accepted
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
console.log(path.join(__dirname, './dist/tupper/browser/'));
app.use(express.static(path.join(__dirname, './dist/tupper/browser/')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use('/products', productRoutes);
//app.use('/tags', tagRoutes);
//app.use('/categories', categoryRoutes);

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/tupper/browser/index.html'));
});

// establish a connection to the mongo database mongodb://localhost:27017/cms
// Connect to MongoDB Atlas
mongoose.connect(uri)
  .then(() => 
    console.log('Connected to MongoDB')
  )
  .catch(err => 
    console.error('Error connecting to MongoDB:', err)
  );

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});