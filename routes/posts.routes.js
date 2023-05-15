const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware')
const postContrroller = require('../controllers/posts.controllers')





router.get('/',postContrroller.list)
router.post('/',authMiddleware,postContrroller.create)
router.get('/:name',postContrroller.detail)
router.put('/:name',authMiddleware,postContrroller.update)
router.delete('/:name',authMiddleware,postContrroller.delete)


module.exports = router