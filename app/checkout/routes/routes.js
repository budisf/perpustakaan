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

    });

    routers.group("/v1/transaction", (router) => { 

        router.get('/', checkoutController.history);
        router.patch('/', checkoutController.returnBook);
        router.post('/', checkoutController.createTransaction);

    });

    app.use('/api', routers);
};