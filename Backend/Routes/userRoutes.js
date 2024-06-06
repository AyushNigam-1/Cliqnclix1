const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const JwtProtected = require('../Middleware/JwtProtection');

router.get('/getUser', JwtProtected, userController.getUser);
router.post('/validateUser', userController.validateUser);
router.post('/createUser', userController.createUser);
router.post('/updateUser', JwtProtected, userController.updateUser);
router.post('/updateCart', JwtProtected, userController.updateCart);
router.post('/updateWishlist', JwtProtected, userController.updateWishlist);
module.exports = router