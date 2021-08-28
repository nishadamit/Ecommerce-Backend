const express = require('express');
const { signUp, signIn } = require('../controllers/auth');
const auth = require('../middleware/Auth');

const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',signIn);

// router.post('/profile',auth,(req,res) =>{
//        res.json({profile:"propfle data "})
// })

module.exports = router;