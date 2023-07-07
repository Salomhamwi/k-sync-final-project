"use strict";

const express = require("express");
const morgan = require("morgan");

const { signupHandler } = require('./handlers/signupHandler');
const { loginHandler } = require('./handlers/loginHandler');
const { profileUpdateHandler } = require('./handlers/profileUpdateHandler');

const PORT = 4000;
express()
.use(function (req, res, next) {
    res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
.use(morgan("tiny"))
.use(express.static("./server/assets"))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use("/", express.static(__dirname + "/"))
//endpoints
.post("/signup", signupHandler)
.post("/login", loginHandler)
.patch("/profile/:userId", profileUpdateHandler)

.listen(PORT, () => console.info(`Listening on port ${PORT}`));


