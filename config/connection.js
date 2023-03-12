const { Client } = require('pg')

const conf = function () {
    const client = new Client({
        password: "d3v3l0p8015",
        user: "postgres",
        host: '35.187.248.198',
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
