const express = require('express');
const { authController } = require('../controller');
const router = express.Router();

router.post('/signup', authController.signupUser);
router.post('/signin', authController.signinUser);

module.exports = router;