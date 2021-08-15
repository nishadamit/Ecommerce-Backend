const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.lzjop.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
                     {
                         useNewUrlParser: true, 
                         useUnifiedTopology: true
                     }
                 ).then(() =>{
                     console.log("Database connected Successfully")
                 })
