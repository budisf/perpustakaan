const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

const app = express()
const port = 8083

// ===============initialization bodyParser====================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ===============database connection====================
const config = require(path.resolve('config/connection.js'));
const client = config.data;
(async () => {
    await client.connect().then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  })();


// ===============route====================
require ('./routes/routes')(app);

// ===============server connection====================
(async () => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })();
