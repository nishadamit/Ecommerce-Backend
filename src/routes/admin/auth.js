const express = require('express');
const { signUp, signIn } = require('../../controllers/admin/auth');
const auth = require('../../middleware/Auth');

const router = express.Router();

router.post('/admin/signup',signUp);
router.post('/admin/signin',signIn);

// router.post('/profile',auth,(req,res) =>{
//        res.json({profile:"propfle data "})
// })

module.exports = router;