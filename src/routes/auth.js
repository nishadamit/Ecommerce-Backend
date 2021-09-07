const express = require('express');
const { signUp, signIn } = require('../controllers/auth');
const auth = require('../middleware/Auth');
const { check } = require('express-validator');

const router = express.Router();

router.post('/signup',
[
    check('firstName')
    .notEmpty()
    .withMessage('FirstName is required.'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName is required.'),
    check('email')
    .isEmail()
    .withMessage('Valid Email is required.'),
    check('password')
    .isLength({min:6})
    .withMessage('Password is required.'),

]
,signUp);
router.post('/signin',signIn);

// router.post('/profile',auth,(req,res) =>{
//        res.json({profile:"propfle data "})
// })

module.exports = router;