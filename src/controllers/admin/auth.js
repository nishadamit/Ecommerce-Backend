const User = require('../../models/user');

exports.signUp = async(req,res) =>{

    const user = await User.findOne({email:req.body.email});
    if(user){
       return res.status(400).json({message:"Admin already registered."})
    }
    const { firstName, lastName, email, password } = req.body;
    const user2 = new User({
        firstName,
        lastName,
        email,
        password,
        userName: Math.random().toString(),
        role: 'admin'
    });
    try {
        await user2.save()
        res.status(201).json({message:"Admin Created Successfully",user2})
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
        
        if(user.authenticate(req.body.password)){
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