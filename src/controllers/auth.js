const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.signUp = async(req,res) =>{

    const errors = await validationResult(req);

    return res.status(400).json({errors:errors.array()})

    const user = await User.findOne({email:req.body.email});
    if(user){
       return res.status(400).json({message:"User already registered."})
    }
    const { firstName, lastName, email, password } = req.body;
    const user2 = new User({
        firstName,
        lastName,
        email,
        password,
        userName: Math.random().toString()
    });
    try {
        await user2.save()
        res.status(201).json({message:"User Created Successfully",user2})
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.signIn = async(req,res) =>{

    try {
        const user = await User.findOne({email:req.body.email});
        console.log(user)
        if(!user){
            return res.status(400).json({message:"No user exits."})
        }
        
        if(user.authenticate(req.body.password) || user.role === 'admin'){
               const token = await user.generateAuthToken();
               const {firstName,lastName,role,email} = user;
               res.status(200).json({
                   token,
                   user:{
                       firstName,lastName,role,email
                   }
               })
        }else{
            return res.status(400).json({message:"Incorrect Password."})
        }
    } catch (error) {
        return res.status(400).json({message:"Something went wrogn."})
    }
}