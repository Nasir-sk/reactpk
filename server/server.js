const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('./db/config');
const User = require('./db/User')
const app = express();
app.use(cors()); 
app.use(express.json());

app.post("/signup", async (req, resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    resp.send(result);
})

app.post("/login", async (req, resp)=>{
    console.log(req.body);
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            resp.send(user)
        }else{
            resp.send({result:"No user found"})
        }
    }else{
        resp.send({result:"No user found"})
    }
})

app.listen(5000);

