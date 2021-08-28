const express = require('express');
require('./db/mongoose');
const env = require('dotenv');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

const app = express();
env.config();

//routes
app.use(express.json());
app.use('/api',authRoutes);
app.use('/api',adminRoutes);


app.listen(process.env.PORT,() =>{
     console.log(` Server is running at port ${process.env.PORT}`)
})