/**
*** Basic Modules
**/

const path = require('path');
var routers = require("express").Router();
require('express-group-routes');

/**
*** Get Controllers
**/

const teacherController = require(path.resolve('app/teacher/controllers/teacher_controller'))

module.exports = app => {

    routers.group("/teacher", (router) => {

        router.get('/', teacherController.index);
        router.get('/:id', teacherController.getById);
        router.patch('/:id', teacherController.store);
        router.put('/:id', teacherController.update);
        router.delete('/:id', teacherController.delete);
        router.put('/:id', teacherController.softDelete);

    });

    app.use('/api/v1', routers);
};