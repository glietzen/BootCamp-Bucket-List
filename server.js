const express = require('express');
const path = require('path');

const users = require('./routes/api/users');
const routes = require('./routes');
const items = require('./routes/api/items');
const lists = require('./routes/api/lists');
const getUserInfo = require('./routes/api/getUserInfo');
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
app.use('/api/items', items);
app.use('/api/lists', lists);
app.use('/api/getUserInfo', getUserInfo);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


app.listen(port, () => console.log(`Server running on port ${port}`));
