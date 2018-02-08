// Set up ========================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var morgan         = require('morgan');           // logs requests to the console
var bodyParser     = require('body-parser');      // pull info from HTML Post
var methodOverride = require('method-override');   // simulate DELETE and PUT
var routes         = require('./routes/routes');

// Configuration ========================
var uri = "mongodb://ds031701.mongolab.com:31701/heroku_app33141437";
var options = { 
  user: 'plango-dev',
  pass: 'Pl@ng0.us',
  server: { auto_reconnect : true, socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
};   
mongoose.connect(uri, options);

app.use(express.static(__dirname + '/public'));   // set static file locations for folders under public
app.use(morgan('dev'));                           // log every request to console
app.use(bodyParser.urlencoded({'extended':'true'}));  // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                       // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(routes);

app.use(methodOverride());

app.listen(3000);
console.log("listening on port 3000");