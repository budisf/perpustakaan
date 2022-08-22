const path = require('path');
const config = require(path.resolve('config/connection.js'));
const client = config.data;

module.exports.getAllBooks = async (skip, limit) => {
 
    const sql = 'SELECT * FROM book ORDER BY id ASC LIMIT $1 offset $2';
    let data = await client.query(sql,[limit,skip]);
    return data.rows;

}

module.exports.cekDataCart = async (data) => {
 
    const {user_id, book_id} = data;
    const sql = `SELECT COUNT(*) FROM cart WHERE user_id = $1 and book_id = $2`;
    let result = await client.query(sql,[user_id, book_id]);
    let totalArray = result.rows;
    let total = totalArray[0].count;
    return total;

}

module.exports.getCartByUserId = async (id) => {

    console.log(id);
    const sql = `SELECT a."id", a."title",  a."image_s" FROM "book" a join "cart" b on a."id" = b."book_id" WHERE b."user_id" = $1`;
    let data = await client.query(sql,[id]);
    return data.rows;

}

module.exports.createCheckoutsCart = async (data) => {

    const { user_id, book_id } = data ;
    const sql = 'INSERT INTO cart (user_id, book_id) VALUES ($1, $2)';
    let result = await client.query( sql, [user_id, book_id]);
    return result;

}


