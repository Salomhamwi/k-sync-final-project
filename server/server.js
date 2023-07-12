"use strict";

const express = require("express");
const morgan = require("morgan");

const { signupHandler } = require('./handlers/signupHandler');
const { loginHandler } = require('./handlers/loginHandler');
const { profileUpdateHandler } = require('./handlers/profileUpdateHandler');
const { createTeamHandler, updateTeamJoinedHandler } = require('./handlers/TeamandUserHandler');
const { teamHandler } = require("./handlers/teamHandler");
const { fetchTeamJoinedHandler } = require("./handlers/fetchTeamJoinedHandler");
const { fetchUserDetails } = require('./handlers/fetchUserDetails');
const { addMemberHandler } = require('./handlers/addMemberHandler');
const { removeMemberHandler } = require('./handlers/removeMemberHandler');
const { deleteTeamHandler } = require('./handlers/deleteTeamHandler');
const { fetchDragonBoatRoleAndPaddlingSideHandler } = require('./handlers/fetchDragonBoatRoleAndPaddlingSideHandler');
const { updateRosterHandler } = require('./handlers/updateRosterHandler');
const { getRosterHandler } = require('./handlers/getRosterHandler');


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
.post('/createteam', createTeamHandler)
.get("/team/:teamName", teamHandler)
.put('/updateteamjoined/:userId', updateTeamJoinedHandler)
.get('/fetchteamjoined/:userId', fetchTeamJoinedHandler)
.get('/team/members/:userId', fetchUserDetails)
.post('/addmember/:userId', addMemberHandler)
.delete('/team/:teamId/member/:memberId', removeMemberHandler)
.delete('/team/:teamId', deleteTeamHandler)
.get('/profile/:userId', fetchDragonBoatRoleAndPaddlingSideHandler)
.post('/update-roster', updateRosterHandler)
.get('/roster/:teamName', getRosterHandler)



.listen(PORT, () => console.info(`Listening on port ${PORT}`));


