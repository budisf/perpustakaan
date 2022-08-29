/**
*** Basic Modules
**/
const express = require('express');
const path = require('path');
require('express-group-routes');
var routers = require("express").Router();

/**
*** Get Controllers
**/
const userController = require(path.resolve('app/user/controllers/user_controller'));

module.exports = app => {

    routers.group("/v1/user", (router) => { 

        router.post('/login', userController.login);
 
    });

    app.use('/api', routers);
};