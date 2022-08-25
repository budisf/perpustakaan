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
const bookController = require(path.resolve('app/book/controllers/book_controller'));

module.exports = app => {

    routers.group("/v1/book", (router) => { 

        router.get('/', bookController.index);
        router.get('/search', bookController.search);
        router.get('/:id', bookController.getById);
    

    });

    app.use('/api', routers);
};