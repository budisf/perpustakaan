/**
*** Basic Modules
**/
const path = require('path');

module.exports = app => {

     require(path.resolve('app/book/routes/routes'))(app)
     require(path.resolve('app/checkout/routes/routes'))(app)
     require(path.resolve('app/user/routes/routes'))(app)

    };
