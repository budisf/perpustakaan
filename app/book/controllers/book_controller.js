
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

exports.search = async (req, res) => {

  try {

    let name = req.query.name;

    if(!name){
      return res.status(400).json(Responses.notFound("name required"));
    }

    let data = await bookService.getBookSearch(name)
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

exports.getById = async (req, res) => {

  try {

    id = req.params.id;

    let data = await bookService.getBookById(id)
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

