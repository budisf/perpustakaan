
/**
*** Basic Modules
**/
const path = require('path');

const studentService = require(path.resolve('app/student/services/studentService'))
const Responses = require(path.resolve('response/responses'))

exports.index = async (req, res) => {
  
  let page = req.query.page ? req.query.page : 0;
  let limit = req.query.limit ? req.query.limit : 10;

  try {
    
    let data = await studentService.getStudents(page,limit)
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

exports.store = async (req, res) => {

  try{

    let data = req.body ;
    let result = await studentService.createStudents(data)  
    .then(() => res.status(200).json(Responses.created(`Student`)));
    return result;

  }catch(err){
    
    return res.status(500).json(Responses.serverError(err));

  }
  

}
