


const res = require('express/lib/response');
const ApiError = require('../exeption/api-error');


module.exports = (err,req,next) =>{
    console.log(err);

    if(err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,errors:err.errors
        })
    }
    return res.status(500).json({
        message:"ошибка сервира"
    })
}