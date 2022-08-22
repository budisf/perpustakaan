const path = require('path');
const studentRepo = require(path.resolve('app/student/repositories/studentsRepository'))

//untuk logic
exports.getStudents = async (page,limit) => {

    try{
        
        var page = page == 0 ? 0 : page - 1 ;  
        let skip = page * limit;
        let data = await studentRepo.getAllStudents(skip,limit);
        return data;

    }catch(err){

        throw new Error(err);

    }

}


exports.createStudents = async (data) => {

    try{
        
        let result = await studentRepo.createStudents(data);
        return result;

    }catch(err){

        throw new Error(err);

    }
    
}
