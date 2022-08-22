
const path = require('path');
const config = require(path.resolve('config/connection.js'));
const client = config.data;

module.exports.cekExist = async (table,id) => {
 
    const sql = `SELECT COUNT(*) FROM ${table} WHERE id = $1`;
    let result = await client.query(sql,[id]);
    let totalArray = result.rows;
    let total = totalArray[0].count;
    return total;

}