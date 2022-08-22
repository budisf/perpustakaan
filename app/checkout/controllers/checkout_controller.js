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
    let data = await checkoutService.getCart(userId)
    .then(response =>{
      if(response == 0){
          return res.status(400).json(Responses.notFound("Data not found"));
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

    let cekUserExist = await helper.cekExist('users',userId);
    let cekBookExist = await helper.cekExist('book',bookId);

    if(cekUserExist == 0){
      return res.status(400).json(Responses.notFound("User not found !"));
    }

    if(cekBookExist == 0){
      return res.status(400).json(Responses.notFound("Book not found !"));
    }

    let data = await checkoutService.removeCart(userId, bookId)
    return data;

  }catch(err){

    return res.status(500).json(Responses.serverError(err));

  }

}

exports.store = async (req, res) => {

  try{

    let data = req.body ;
    let cekUserExist = await helper.cekExist('users',data.user_id);
    let cekBookExist = await helper.cekExist('book',data.book_id);

    if(cekUserExist == 0){
      return res.status(400).json(Responses.notFound("User not found !"));
    }

    if(cekBookExist == 0){
      return res.status(400).json(Responses.notFound("Book not found !"));
    }

    let stock = await bookRepo.getStock(data.book_id);
    let cekDataExist = await checkoutRepo.cekDataCart(data);

    if(stock == 0){
      return res.status(400).json(Responses.notFound("Book not available right now"));
    }

    if(cekDataExist != 0){
      return res.status(400).json(Responses.notFound("You already add this book to cart, chose another book !"));
    }

    let result = await checkoutService.createCheckoutsCart(data)
    .then(() => res.status(200).json(Responses.created(`cart`)));
    return result;

  }catch(err){

    return res.status(500).json(Responses.serverError(err));

  }


}
