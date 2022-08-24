
/**
*** Basic Modules
**/
const path = require('path');

const userRepo = require(path.resolve('app/user/repository/user_repository'))
const Responses = require(path.resolve('response/responses'))

exports.getUser = async (email) => {



  try {

    let data = await userRepo.getUser(email);
    return data;

  }catch(err){

    return res.status(500).json(Responses.serverError(err));

  }

}


