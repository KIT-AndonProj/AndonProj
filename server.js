const express = require('express');
const mongoose = require('mongoose');

const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

const app = express();

const db = require('./config/keys').mongoURL;

mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello world'));

app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/post', post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

