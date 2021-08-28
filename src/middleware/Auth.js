const jwt = require('jsonwebtoken');
const env = require('dotenv');

env.config();

const auth = async (req,res,next) =>{

    try {
            const token = req.headers.authorization.split(' ')[1]
            const user = jwt.verify(token,process.env.JWT_SECRET)
            req.user = user
            next()
    } catch (error) {
             res.status(400).send({error: error})
    }
}

module.exports = auth;