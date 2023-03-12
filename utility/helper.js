
const path = require('path');
const config = require(path.resolve('config/connection.js'));
const client = config.data;
const bcrypt = require('bcrypt');

module.exports.cekExist = async (table,id, field = 'id') => {
 
    const sql = `SELECT COUNT(*) FROM ${table} WHERE ${field} = $1`;
    let result = await client.query(sql,[id]);
    let totalArray = result.rows;
    let total = totalArray[0].count;
    return total;

}

module.exports.comparePassword = (hashPassword, password) => {
    return bcrypt.compareSync(password, hashPassword);
  },

module.exports.hashPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }



