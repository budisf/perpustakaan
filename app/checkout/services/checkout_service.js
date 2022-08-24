const path = require('path');
const checkoutRepo = require(path.resolve('app/checkout/repositories/checkout_repository'));
const bookService = require(path.resolve('app/book/services/book_service'))
//untuk logic
exports.getCart = async (userId) => {

    try{

        let data = await checkoutRepo.getCartByUserId(userId);
        return data;

    }catch(err){

        throw new Error(err);

    }

}

exports.removeCart = async (usrId,bookId) => {

    try{

        let data = await checkoutRepo.removeCart(usrId,bookId);
        return data;

    }catch(err){

        throw new Error(err);

    }

}


exports.createCheckoutsCart = async (data) => {

    try{

        let result = await checkoutRepo.createCheckoutsCart(data);
        return result;

    }catch(err){

        throw new Error(err);

    }
    
}

exports.createTransaction = async (data) => {

    try{

        let header = await checkoutRepo.createHeaderTransaction(data);
        let transaction_id = header[0].id;
        const bookData = await checkoutRepo.getCartByUserId(data.user_id);
        //console.log(bookData);
        bookData.forEach(n => {
            let dataInput = {
                user_id : data.user_id,
                book_id : n.id,
                return_status : false,
                return_date : data.return_date,
                transaction_id : transaction_id
            }
            checkoutRepo.createDetailTransaction(dataInput);
            bookService.updateStock(n.id,false); //parameter false if reduce stock
        });

       let result = await checkoutRepo.removeCartByUserId(data.user_id);
       return result;

    }catch(err){

        throw new Error(err);

    }

}

exports.getHistoryTransaction = async (userId) => {

    try{

        let data = await checkoutRepo.getHistoryTransaction(userId);
        return data;

    }catch(err){

        throw new Error(err);

    }

}

exports.returnBook = async (data) => {
    try{

        const booksId = data.book_id;
        const userId = data.user_id;
        await Promise.all(booksId.map( async (item) => {

             await checkoutRepo.updateStatusReturn(item, userId);
             await bookService.updateStock(item);

        }))
 
    }catch(err){

        throw new Error(err)

    }
}