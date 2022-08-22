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
const studentController = require(path.resolve('app/student/controllers/student_controller')) //ini namanya path

module.exports = app => {

    routers.group("/v1/student", (router) => { //ini namanya route

        router.get('/', studentController.index);
        // router.get('/:id', studentController.getById);
        router.post('/', studentController.store);
        // router.put('/:id', studentController.update);
        // router.delete('/:id', studentController.delete);
        // router.put('/:id', studentController.softDelete);

    });

    app.use('/api', routers);
};