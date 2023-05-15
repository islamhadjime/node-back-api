const Router = require('express')
const authControllers = require("../controllers/auth.controllers");
const {check, validationResult} = require('express-validator')
const router = new Router()

router.post(
    '/register',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('username', 'Uncorrect username').isLength({min:3, max:12}),
        check('password', 'Uncorrect password').isLength({min:3, max:12}),
    ],
    authControllers.registration
)


router.post('/login',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Password is empty').notEmpty(),
       
    ],
    authControllers.login
)

module.exports = router