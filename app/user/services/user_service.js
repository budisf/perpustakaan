
/**
*** Basic Modules
**/
const path = require('path');

const userRepo = require(path.resolve('app/user/repository/user_repository'))
const Responses = require(path.resolve('response/responses'))

exports.getUser = async (email) => {

  try {

    let result = await userRepo.getUser(email);
    return result;

  }catch(err){

    return res.status(500).json(Responses.serverError(err));

  }

}

exports.createUser = async (data) => {

  try {

    let result = await userRepo.createUser(data);
    return result;

  }catch(err){

    return res.status(500).json(Responses.serverError(err));

  }

}

