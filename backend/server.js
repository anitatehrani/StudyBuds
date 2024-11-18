"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (err, req, res, next) {
    if (!err) {
        return next();
    }
    res.status(500);
    res.send('500: Internal server error');
});
var index_1 = require("./src/routes/index");
//routes
app.use(index_1.default);
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
app.listen(process.env.PORT || 1337);
console.log("Server on port ".concat(process.env.PORT));
