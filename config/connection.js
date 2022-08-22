const { Client } = require('pg')

const conf = function () {
    const client = new Client({
        password: "postgres",
        user: "postgres",
        host: "localhost",
        database : "perpustakaan",
        pool: {
            max: 100,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
    });
    return client
}

exports.data = conf();
