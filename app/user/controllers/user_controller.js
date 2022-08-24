
/**
*** Basic Modules
**/
const { Console } = require('console');
const path = require('path');

const userService = require(path.resolve('app/user/services/user_service'))
const Responses = require(path.resolve('response/responses'))
const Helper = require(path.resolve('utility/helper'));

exports.login = async (req, res) => {
  
  let email = req.body.email;
  let pass = req.body.password;

  try {

    if (!email || !pass) {
      return res.status(400).json(Responses.notFound("Empty email or password"));
    }

    if (!Helper.isValidEmail(email)) {
      return res.status(400).json(Responses.notFound("Please enter a valid email address"));
    }


    let data = await userService.getUser(email)
    .then(response =>{

      if(response == 0){
        return res.status(400).json(Responses.notFound("Wrong email"));
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


