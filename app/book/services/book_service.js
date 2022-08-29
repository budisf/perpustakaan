const path = require('path');
const { title } = require('process');
const bookRepo = require(path.resolve('app/book/repositories/book_repository'))

//untuk logic
exports.getBooks = async (page,limit) => {

    try{
        
        let pageA = page == 0 ? 0 : page - 1 ;
        let skip = pageA * limit;
        let data = await bookRepo.getAllBooks(skip,limit);
        let rowsCount = await bookRepo.getCount("book");
        let totalPage = Math.ceil(rowsCount / limit)
        const result = {
            "current_page" : page == 0 ? 1 : parseInt(page),
            "total_page" : totalPage,
            "total_data" : parseInt(rowsCount),
            "data_per_page" : data,

        }
        return result;

    }catch(err){

        throw new Error(err);

    }

}

exports.getBookSearch = async (query) => {

    try{
        let title = query.title
        let isbn = query.isbn
        let author = query.author

        if(title){
            return await bookRepo.getBookSearchTitle(title);
        }
        if(author){
            return await bookRepo.getBookSearchAuthor(author);
        }
        if(isbn){
            return await bookRepo.getBookSearchIsbn(isbn);
        }

    }catch(err){

        throw new Error(err);

    }

}

exports.getBookById = async (id) => {

    try{
        
        let data = await bookRepo.getBookById(id);
        return data;

    }catch(err){

        throw new Error(err);

    }

}

module.exports.updateStock = async (bookId, isTrue = true) => { //IF false will reduce stock

    try{

        let stock = await bookRepo.getStock(bookId);
        let result = isTrue ? stock + 1 : stock -1 ;
        let updateStock = await bookRepo.updateStock(bookId,result);
        return updateStock;

    }catch(err){

        throw new Error(err);

    }

 }
