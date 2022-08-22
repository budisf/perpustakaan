
/**
*** Basic Modules
**/
const path = require('path');

const bookService = require(path.resolve('app/book/services/book_service'))
const Responses = require(path.resolve('response/responses'))

exports.index = async (req, res) => {
  
  let page = req.query.page ? req.query.page : 0;
  let limit = req.query.limit ? req.query.limit : 20;

  try {
    
    let data = await bookService.getBooks(page,limit)
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

exports.search = async (req, res) => {

  try {

    name = req.query.name;

    let data = await bookService.getBookSearch(name)
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

exports.getById = async (req, res) => {

  try {

    id = req.params.id;

    let data = await bookService.getBookById(id)
    .then(response =>{
      if(response == 0){
          return res.status(400).json(Responses.notFound("ID not found"));
      }
      result = Responses.list(response)
      return res.status(200).json(result);

    });

    return data;

  }catch(err){

    return res.status(500).json(Responses.serverError(err));

  }

}

exports.store = async (req, res) => {

  try{

    let data = req.body ;
    let result = await bookService.createBooks(data)  
    .then(() => res.status(200).json(Responses.created(`Book`)));
    return result;

  }catch(err){
    
    return res.status(500).json(Responses.serverError(err));

  }
  

}
