const path = require('path');
const config = require(path.resolve('config/connection.js'));
const client = config.data;


module.exports.getUser = async (email) => {
 
    const sql = `SELECT * FROM users WHERE email = $1 `;
    let data = await client.query(sql,[email]);
    return data.rows;

}


