const path = require('path');
const config = require(path.resolve('config/connection.js'));
const client = config.data;
const Helper = require(path.resolve('utility/helper'));


module.exports.getUser = async (email) => {
 
    const sql = `SELECT id, username, pass FROM users WHERE email = $1 `;
    let data = await client.query(sql,[email]);
    return data.rows;

}

module.exports.createUser = async (data) => {

    const { name, username, address, phone, email, password } = data ;
    const hashPassword = Helper.hashPassword(password);
    const sql = 'INSERT INTO users (short_name, address, email, pass, username, phone) VALUES ($1, $2, $3, $4, $5, $6)';
    let result = await client.query( sql, [name, address, email, hashPassword, username, phone]);
    return result;

}

