const path = require('path');
const config = require(path.resolve('config/connection.js'));
const client = config.data;

module.exports.getAllBooks = async (skip, limit) => {
 
    const sql = 'SELECT * FROM book ORDER BY id ASC LIMIT $1 offset $2';
    let data = await client.query(sql,[limit,skip]);
    return data.rows;

}

module.exports.getBookSearchTitle = async (title) => {
 
    const sql = `SELECT * FROM book WHERE title LIKE $1`;
    let data = await client.query(sql,['\%'+title+'%']);
    return data.rows;

}
module.exports.getBookSearchAuthor = async (author) => {
 
    const sql = `SELECT * FROM book WHERE author LIKE $1`;
    let data = await client.query(sql,['\%'+author+'%']);
    return data.rows;

}
module.exports.getBookSearchIsbn = async (isbn) => {
 
    const sql = `SELECT * FROM book WHERE isbn LIKE $1`;
    let data = await client.query(sql,['\%'+isbn+'%']);
    return data.rows;

}

module.exports.getBookById = async (id) => {
 
    const sql = `SELECT * FROM book WHERE id = $1`;
    let data = await client.query(sql,[id]);
    return data.rows;

}

module.exports.getCount = async (table) => {

    const sql = `SELECT COUNT(*) FROM ${table}`;
    let data = await client.query(sql);
    let totalArray = data.rows;
    let total = totalArray[0].count
    return total;

}

module.exports.getStock = async (id) => {

    const sql = `SELECT stok FROM book WHERE id = $1`;
    let data = await client.query(sql, [id]);
    let totalArray = data.rows;
    let stock = !totalArray ? 0 : totalArray[0].stok;
    return stock;

}

module.exports.updateStock = async (bookId, stock) => {

    const sql = `UPDATE book SET stok = $2 WHERE id = $1`;
    let result = await client.query( sql, [bookId, stock]);
    return result;

 }


