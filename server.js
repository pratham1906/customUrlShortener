const express=require('express');
const app=express();
const connectDB=require('./config/db');
//middleware for using json
app.use(express.json({
    extended:false
}))

connectDB();

app.use('/',require('./routes.js/index'))
app.use('/api/url',require('./routes.js/url'))
app.listen(5000,()=>{
    console.log("Server is running on Port 5000")
})