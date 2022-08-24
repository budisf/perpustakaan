const path = require('path');
const config = require(path.resolve('config/connection.js'));
const client = config.data;

module.exports.getAllBooks = async (skip, limit) => {
 
    const sql = 'SELECT * FROM book ORDER BY id ASC LIMIT $1 offset $2';
    let data = await client.query(sql,[limit,skip]);
    return data.rows;

}

module.exports.getBookSearch = async (name) => {
 
    const sql = `SELECT * FROM book WHERE title LIKE $1 OR author LIKE $1 OR isbn LIKE $1`;
    let data = await client.query(sql,['\%'+name+'%']);
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
    let stock = !totalArray ? totalArray[0].stok : 0;
    return stock;

}

module.exports.updateStock = async (bookId, stock) => {

    const sql = `UPDATE book SET stok = $2 WHERE id = $1`;
    let result = await client.query( sql, [bookId, stock]);
    return result;

 }

 module.exports.updateRatting = async (req, res) => {
 

    const sql = 'SELECT isbn FROM book';
    let data = await client.query(sql);
    let isbn = data.rows;
    for (item of isbn){
        // console.log(item.isbn)
  


        const sql2 = 'SELECT book_ratting FROM ratting WHERE isbn = $1';
        let data2 = await client.query(sql2,[item.isbn]);
        ratting = data2.rows;

        const sqlC = `SELECT COUNT(*) FROM ratting WHERE isbn = $1`;
        let dataC = await client.query(sqlC,[item.isbn]);
        let totalArray = dataC.rows;
        let total = totalArray[0].count
    
        let jumlah = 0;
        for (m of ratting){
            jumlah += m.book_ratting; 
        }
        let totalAverage = jumlah / total;


        const sql3 = `UPDATE book SET average_ratting = $1, rattings_count = $2 WHERE isbn = $3`;
        let result = await client.query( sql3, [totalAverage, total, item.isbn]);

        console.log(`${item.isbn} avarege = ${totalAverage}`);
        console.log(`${item.isbn} total = ${total}`)

    }

}


