const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const authUtil = require('../../middlewares/authUtil')

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/', authUtil.checkToken, userController.readAll);
router.get('/profile', authUtil.checkToken, userController.getProfile);
/** profile과 위치 바뀌면 안됌. */
router.get('/:id', authUtil.checkToken, userController.readOne);

module.exports = router;
