
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

    let title = req.query.title;
    let author = req.query.author;
    let isbn = req.query.isbn;
    let query_params = req.query

    if(!title && !author && !isbn){
      return res.status(400).json(Responses.notFound("query param required (title / author / isbn)"));
    }
    if(title && author && isbn){
      return res.status(400).json(Responses.notFound("select one query param (title / author / isbn)"));
    }
    if(title && author){
      return res.status(400).json(Responses.notFound("select one query param (title / author / isbn)"));
    }
    if(author && isbn){
      return res.status(400).json(Responses.notFound("select one query param (title / author / isbn)"));
    }
    if(title && isbn){
      return res.status(400).json(Responses.notFound("select one query param (title / author / isbn)"));
    }

    let data = await bookService.getBookSearch(query_params)
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

