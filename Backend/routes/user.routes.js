const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controller/user.controller');    
router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:5}).withMessage('Password must be at least 5 characters')    
],userController.registerUser);


module.exports=router;
// Compare this snippet from Backend/controller/user.controller.js: 