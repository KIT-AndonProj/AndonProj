const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const user = require('./routes/api/user');
const git = require('./routes/api/git');
const analyze = require('./routes/api/analyze');
const board = require('./routes/api/board');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURL;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/user', user);
app.use('/api/git', git);
app.use('/api/analyze', analyze);
app.use('/api/board', board);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

