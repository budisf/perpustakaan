const path = require('path');
const checkoutRepo = require(path.resolve('app/checkout/repositories/checkout_repository'));

//untuk logic
exports.getCart = async (userId) => {

    try{

        let data = await checkoutRepo.getCartByUserId(userId);
        return data;

    }catch(err){

        throw new Error(err);

    }

}

exports.getCheckoutSearch = async (name) => {

    try{
        
        let data = await checkoutRepo.getCheckoutSearch(name);
        return data;

    }catch(err){

        throw new Error(err);

    }

}

exports.removeCart = async (usrId,bookId) => {

    try{

        let data = await checkoutRepo.removeCart(usrId,bookId);//sampai sini
        return data;

    }catch(err){

        throw new Error(err);

    }

}


exports.createCheckoutsCart = async (data) => {

    try{

        let result = await checkoutRepo.createCheckoutsCart(data);
        return result;

    }catch(err){

        throw new Error(err);

    }
    
}
