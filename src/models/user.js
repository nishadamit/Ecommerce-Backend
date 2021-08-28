 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const env = require('dotenv');

env.config();

 const userSchema = new mongoose.Schema({
     firstName:{
         type:String,
         required:true,
         trim:true,
         min:3,
         max:30
     },
     lastName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:30
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    hash_password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    contactNumber:String,
    profilePicture:String
 },{
     timestamps:true
 });

 userSchema.virtual('password')
 .set(function(password){
     const user = this;
     user.hash_password = bcrypt.hashSync(password,10);
 })

 userSchema.virtual('fullName')
 .get(function(){
       return `${this.firstName} ${this.lastName}`
 })

 userSchema.methods.authenticate = function(password){
     return bcrypt.compareSync(password,this.hash_password)
 }

 userSchema.methods.generateAuthToken = async function(){
       const user = this;
       const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
       return token
 }

 module.exports = mongoose.model('User',userSchema)