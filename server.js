const express = require('express');
const path = require('path');

const users = require('./routes/api/users');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const passport = require('passport');
const mongoose = require("mongoose");
const Models = require('./models');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bucketlist";
console.log(MONGODB_URI);
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;

app.use(passport.initialize());

// PASSPORT CONFIG
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use(routes);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../app/dist/')); // serve the static react app
  app.get(/^\/(?!api).*/, (req, res) => { // don't serve api routes to react app
    res.sendFile('index.html', { root: '../app/dist/' });
  });
  console.log('Serving React App...');
}


app.listen(port, () => console.log(`Server running on port ${port}`));
