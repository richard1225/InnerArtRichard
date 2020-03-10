const express = require("express");

const app = express();

app.get('/',(req,res)=>
    res.json({msg:'welcome'})
);

// Define Routes
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/arts',require('./routes/arts'));


const PORT = process.env.Port || 5000;

app.listen(PORT,()=>console.log('Server started'))