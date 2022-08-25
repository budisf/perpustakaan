/**
*** Basic Modules
**/
const path = require('path');

const checkoutService = require(path.resolve('app/checkout/services/checkout_service'));
const Responses = require(path.resolve('response/responses'));
const bookRepo = require(path.resolve('app/book/repositories/book_repository'));
const checkoutRepo = require(path.resolve('app/checkout/repositories/checkout_repository'));
const helper = require(path.resolve('utility/helper'));

exports.index = async (req, res) => {
  
  try {
    
    userId = req.query.user_id;
    
    if(!userId){
      return res.status(400).json(Responses.notFound("user_id required"));
    }

    let data = await checkoutService.getCart(userId)
    .then(response =>{
      if(response == 0){
          return res.status(200).json(Responses.notExist("Data not found"));
      }
      result = Responses.list(response)
      return res.status(200).json(result);

    });

    return data;

  }catch(err){
    
    return res.status(500).json(Responses.serverError(err));

  }

}

exports.delete = async (req, res) => {

  try {

    userId = req.query.user_id;
    bookId = req.query.book_id;

    if(!userId){
      return res.status(400).json(Responses.notFound("user_id required"));
    }

    if(!bookId){
      return res.status(400).json(Responses.notFound("book_id required"));
    }

    let cekUserExist = await helper.cekExist('cart',userId,'user_id');
    let cekBookExist = await checkoutRepo.cekExistCart(userId,bookId);

    if(cekUserExist == 0){
      return res.status(200).json(Responses.notExist("User not found !"));
    }

    if(cekBookExist == 0){
      return res.status(200).json(Responses.notExist("Book not found !"));
    }

    let data = await checkoutService.removeCart(userId, bookId)
    .then(() => res.status(200).json(Responses.deleted(`cart`)));
    return data;

  }catch(err){

    return res.status(500).json(Responses.serverError(err));

  }

}

exports.store = async (req, res) => {

  try{

    let data = req.body ;
    let userId = req.body.user_id;
    let bookId = req.body.book_id;

    if(!userId){
      return res.status(400).json(Responses.notFound("user_id required"));
    }

    if(!bookId){
      return res.status(400).json(Responses.notFound("book_id required"));
    }

    let cekUserExist = await helper.cekExist('users',data.user_id);
    let cekBookExist = await helper.cekExist('book',data.book_id);

    if(cekUserExist == 0){
      return res.status(200).json(Responses.notExist("User not found !"));
    }

    if(cekBookExist == 0){
      return res.status(200).json(Responses.notExist("Book not found !"));
    }

    let stock = await bookRepo.getStock(data.book_id);
    let cekDataExist = await checkoutRepo.cekExistCart(data.user_id,data.book_id);

    if(stock == 0){
      return res.status(200).json(Responses.notExist("Book not available right now"));
    }

    if(cekDataExist != 0){
      return res.status(200).json(Responses.notExist("You already add this book to cart, chose another book !"));
    }

    let result = await checkoutService.createCheckoutsCart(data)
    .then(() => res.status(200).json(Responses.created(`cart`)));
    return result;

  }catch(err){

    return res.status(500).json(Responses.serverError(err));

  }


}

exports.createTransaction = async (req, res) => {

  try{

    let userId = req.body.user_id;
    let return_date = req.body.return_date;

    if(!userId){
      return res.status(400).json(Responses.notFound("user_id required"));
    }

    if(!return_date){
      return res.status(400).json(Responses.notFound("return_date required"));
    }

    let data = req.body ;
    let cekUserExist = await helper.cekExist('cart',data.user_id,'user_id');

    if(cekUserExist == 0){
      return res.status(200).json(Responses.notExist("Data not found !"));
    }

    let result = await checkoutService.createTransaction(data)
    .then(() => res.status(200).json(Responses.created(`transaction`)));
    return result;

  }catch(err){

    return res.status(500).json(Responses.serverError(err));

  }


}

exports.history = async (req, res) => {
  
  try {

    let userId = req.query.user_id;

    if(!userId){
      return res.status(400).json(Responses.notFound("user_id required"));
    }

    let data = await checkoutService.getHistoryTransaction(userId)
    .then(response =>{
      if(response == 0){
          return res.status(200).json(Responses.notExist("Data not found"));
      }
      result = Responses.list(response)
      return res.status(200).json(result);

    });

    return data;

  }catch(err){
    
    return res.status(500).json(Responses.serverError(err));

  }

}

exports.returnBook = async (req, res) => {
  
  try {
    
    let data = req.body;
    let userId = req.body.user_id;
    let bookId = req.body.book_id;

    if(!userId){
      return res.status(400).json(Responses.notFound("user_id required"));
    }

    if(!bookId){
      return res.status(400).json(Responses.notFound("book_id required"));
    }

    for(m of bookId){
      let cekBookExist = await helper.cekExist('book',m);
      if (cekBookExist == 0){
        return res.status(200).json(Responses.notExist("Book not found !"));
      }
    }

    let cekUserExist = await helper.cekExist('transaction_header',data.user_id,'user_id');

    if(cekUserExist == 0){
      return res.status(200).json(Responses.notExist("User not found !"));
    }
    let results = await checkoutService.returnBook(data)
    .then(response =>{
      if(response == 0){
          return res.status(200).json(Responses.notExist("Data not found"));
      }
      let result = Responses.list(response)
      return res.status(200).json(result);

    });

    return results;

  }catch(err){
    
    return res.status(500).json(Responses.serverError(err));

  }

}