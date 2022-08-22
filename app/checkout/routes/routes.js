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
const checkoutController = require(path.resolve('app/checkout/controllers/checkout_controller'));

module.exports = app => {

    routers.group("/v1/cart", (router) => { 

        router.get('/', checkoutController.index);
        router.delete('/', checkoutController.delete);
        router.post('/', checkoutController.store);
        // router.put('/:id', checkoutController.update);
        // router.delete('/:id', checkoutController.delete);
        // router.put('/:id', checkoutController.softDelete);

    });

    app.use('/api', routers);
};