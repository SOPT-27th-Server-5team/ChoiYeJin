const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const authUtils = require('../../middlewares/authUtil')

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/', userController.readAll);
router.get('/profile', authUtils.checkToken, userController.getProfile);
/** profile과 위치 바뀌면 안됌. */
router.get('/:id', authUtils.checkToken, userController.readOne);

module.exports = router;
