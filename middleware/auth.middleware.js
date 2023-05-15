

const jwt = require('jsonwebtoken')
const ApiError = require('../exeption/api-error')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next()
    }
    
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return next(ApiError.UnauthorizedError());
        }
        const decoded = jwt.verify(token, process.env.jwtSecret)
        req.user = decoded
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}