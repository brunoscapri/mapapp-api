const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

app.use(bodyParser.json({
    limit: "5mb"
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

try {
    mongoose.connect(config.connetionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

} catch (e) {
    console.log(e);
}

//declaracao dos models
const User = require("./models/user-model");



app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

module.exports = app;