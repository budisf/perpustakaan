const { json } = require('body-parser');
const path = require('path');
const config = require(path.resolve('config/connection.js'));
const client = config.data;

module.exports.getCartByUserId = async (id) => {

    const sql = `SELECT a.id, a.title,  a.image_s FROM book a join cart b on a.id = b.book_id WHERE b.user_id = $1`;
    let data = await client.query(sql,[id]);
    return data.rows;

}

module.exports.createCheckoutsCart = async (data) => {

    const { user_id, book_id } = data ;
    const sql = 'INSERT INTO cart (user_id, book_id) VALUES ($1, $2)';
    let result = await client.query( sql, [user_id, book_id]);
    return result;

}

module.exports.removeCart = async (usrId,bookId) => {
 
    const sql = `DELETE FROM cart WHERE user_id = $1 AND book_id = $2`;
    let result = await client.query(sql,[usrId, bookId]);
    return result;

}

module.exports.cekExistCart = async (userId, bookId) => {
 
    const sql = `SELECT COUNT(*) FROM cart WHERE user_id = $1 AND book_id = $2`;
    let result = await client.query(sql,[userId,bookId]);
    let totalArray = result.rows;
    let total = totalArray[0].count;
    return total;

}

module.exports.removeCartByUserId = async (usrId) => {
 
    const sql = `DELETE FROM cart WHERE user_id = $1`;
    let result = await client.query(sql,[usrId]);
    return result;

}

module.exports.createHeaderTransaction = async (data) => {

    let timestamp = Date.now();
    let created_at = new Date(timestamp);
    let updated_at = new Date(timestamp);
    const { user_id } = data ;

    const sql = 'INSERT INTO transaction_header (user_id, transaction_status, created_at, updated_at ) VALUES ($1, $2, $3, $4)';
    let result = await client.query( sql, [user_id, false, created_at, updated_at  ])
    .then( async () => {
        let findId = await client.query( `SELECT id FROM transaction_header ORDER BY id DESC LIMIT 1`);
        return findId.rows;
    });
    return result;

}

module.exports.createDetailTransaction = async (data) => {

    let timestamp = Date.now();
    let created_at = new Date(timestamp);
    let updated_at = new Date(timestamp);
    const { user_id,book_id,return_status,return_date,transaction_id} = data
    const sql = 'INSERT INTO transaction_detail (user_id, book_id, return_status, return_date, transaction_id, created_at, updated_at  ) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    let result = await client.query( sql, [user_id, book_id, return_status, return_date, transaction_id, created_at, updated_at]);
    return result;

}

module.exports.getHistoryTransaction = async (id) => {

    let sql = `SELECT * FROM transaction_header  WHERE user_id = $1 ORDER BY ID DESC`;
    let data = await client.query(sql,[id])
    .then( async response => {
        let results = response.rows;
        let data = [];

         await Promise.all(results.map( async (item) => {

            let bookData = await this.getDetailBook(item.id)

                let newData = {
                    borrowed_time : item.created_at,
                    transaction_id : item.id,
                    book_data : bookData
                }

            data.push(newData);

        }))

        return data;
       
    })

    return data;

}

module.exports.getDetailBook = async (transaction_id) => {

    let sql = `SELECT b.*, c.title, c.image_m, c.author FROM transaction_detail b JOIN book c ON b.book_id = c.id WHERE b.transaction_id = $1 `
    let query = await client.query(sql,[transaction_id]);
    return query.rows;

}

module.exports.updateStatusReturn = async (bookId, userId ) => {

    const sql = `UPDATE transaction_detail SET return_status = $1 WHERE book_id = $2 AND user_id = $3`;
    let result = await client.query( sql, [true, bookId, userId]);
    return result;

 }