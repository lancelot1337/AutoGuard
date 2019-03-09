const express = require('express');
const app = express();
const homeRoute = require('./api/routes/home');
const flatRoute = require('./api/routes/flat');
const carRoute = require('./api/routes/car');
const securityRoute = require('./api/routes/security');
const residentRoute = require('./api/routes/resident');
// const dataRoute = require('./api/routes/data');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// for mongoose
mongoose.connect('mongodb://localhost/AutoGuard').then(() => {
    console.log('db connect');
}, (e) => {
    console.log('error:' + e)
});
mongoose.Promise = global.Promise;


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
// app.use(express.static('public'));
app.use('/', homeRoute);
app.use('/api/flat', flatRoute);
app.use('/api/car', carRoute);
app.use('/security', securityRoute);
app.use('/resident', residentRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;