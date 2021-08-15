const express = require('express');
require('./db/mongoose');
const env = require('dotenv');
const authRoutes = require('./routes/auth');

const app = express();
env.config();

//routes
app.use(express.json());
app.use('/api',authRoutes);


app.listen(process.env.PORT,() =>{
     console.log(` Server is running at port ${process.env.PORT}`)
})