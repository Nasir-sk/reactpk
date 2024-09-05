const express = require('express')
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('./db/config');
const User = require('./db/User')
const app = express();
app.use(cors()); 
app.use(express.json());

app.post("/signup",
    [
        // Email Validation
        body('email')
          .isEmail()
          .withMessage('Please enter a valid email')
          .custom(async (email) => {
            // Check if email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
              throw new Error('Email already in use');
            }
            return true;
          }),
        
        // Username Validation
        body('name')
          .isLength({ min: 3 })
          .withMessage('Username must be at least 3 characters long')
          .custom(async (name) => {
            // Check if username already exists
            const existingUser = await User.findOne({ name });
            if (existingUser) {
              throw new Error('Username already in use');
            }
            return true;
          }),
    
        // Password Validation
        body('password')
          .isLength({ min: 8 })
          .withMessage('Password must be at least 8 characters long'),
      ],
      async (req, res) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, name, password } = req.body;
  
      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user
        const newUser = new User({
          email,
          name,
          password: hashedPassword,
        });
  
        // Save user to the database
        await newUser.save();
  
        res.status(201).json({
          message: 'User registered successfully',
          user: {
            email: newUser.email,
            name: newUser.name,
          },
        });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
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

