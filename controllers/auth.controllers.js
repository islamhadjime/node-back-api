

const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ApiError = require('../exeption/api-error');
const {check, validationResult} = require('express-validator')



class AuthControllers {

    async registration (req,res,next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ощибка при валидации',errors.array()))
            }

            const {username, email, password} = req.body
            const candidateEmail = await User.findOne({email:email})

            if(candidateEmail ) {
                return res.status(400).json({message:`User with email ${email} already exist`})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({username, email, password:hashedPassword})
            await user.save()

            res.json({user: user, message: 'User was created'})
        } catch (e) {
            next(e)
        }
    }
    async login (req,res,next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ощибка при валидации',errors.array()))
            }
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user) {
                return next(ApiError.BadRequest('Ощибка авторизация не правильны пароль или логин'))
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if(!isPasswordMatch) {
                return next(ApiError.BadRequest('Ощибка авторизация не правильны пароль или логин'))

            }

            const token = jwt.sign({id: user.id}, process.env.jwtSecret,{expiresIn: '1h'})

            res.json({token, user:{username:user.username, id:user.id, email: user.email}})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthControllers();