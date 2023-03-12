
/**
*** Basic Modules
**/
const { Console } = require('console');
const path = require('path');
const joi = require('joi');

const userService = require(path.resolve('app/user/services/user_service'))
const Responses = require(path.resolve('response/responses'))
const Helper = require(path.resolve('utility/helper'));

exports.login = async (req, res) => {
  
  let email = req.body.email;
  let pass = req.body.password;

  try {

    let schema = joi.object().keys({
      "email": joi.string().email().required(),
      "password" : joi.string().min(3).max(15).required()
    })

    let loginV = schema.validate(req.body)
      if(loginV.error){
        return res.status(400).json(Responses.notFound(loginV.error.message));
      }

    let data = await userService.getUser(email)
    .then(response =>{

      if(response == 0){
        return res.status(400).json(Responses.notFound("\"email\" not found"));
      }

      if(!Helper.comparePassword(response[0].pass, pass)) {
        return res.status(400).json(Responses.notFound("Wrong password"));
      }

      const list = {
        user_id : response[0].id,
        username : response[0].username
      }

      return res.status(200).json(Responses.list(list));

    });

    return data;

  }catch(err){
    
    return res.status(500).json(Responses.serverError(err));

  }

}

exports.register = async (req, res) => {
  
  try {

    let schema = joi.object().keys({
      "name" : joi.string().required(),
      "username" : joi.string().required(),
      "address" : joi.string(),
      "phone" : joi.number().required(),
      "email": joi.string().email().required(),
      "password" : joi.string().min(3).max(15).required(),
      "password_confirmation" : joi.any().equal(joi.ref('password')).required().label('Confirm password')
      .options({ messages: { 'any.only': '{{#label}} does not match'} })
    })

    let registerV = schema.validate(req.body)
      if(registerV.error){
        return res.status(400).json(Responses.notFound(registerV.error.message));
      }
    const emailExists = await Helper.cekExist("users",req.body.email,"email");
      if(emailExists > 0){
        return res.status(400).json(Responses.notFound("\"email\" already used"));
      }
    const usernameExists = await Helper.cekExist("users",req.body.username,"username");
      if(usernameExists > 0){
        return res.status(400).json(Responses.notFound("\"username\" already used"));
      }
    const phoneExists = await Helper.cekExist("users",req.body.phone,"phone");
      if(phoneExists > 0){
        return res.status(400).json(Responses.notFound('\"phone\" already used'));
      }

    let data = await userService.createUser(req.body)
      .then(() => res.status(200).json(Responses.created(`register`)));
    return data;
  
  }catch(err){
    
    return res.status(500).json(Responses.serverError(err));

  }

}


