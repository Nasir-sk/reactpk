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

app.post('/login',
  [
    // Email Validation
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email'),
    // Password Validation
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ], async (req, res)=>{
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const {email, password} = req.body;

  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({ errors: [{msg:"Invalid email or password"}]});
    }
    console.log("email match");
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({errors:[{msg:"Invalid email or password"}]})
    }
    console.log("password match");
   res.status(200).json({message:"Login successful"});
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

app.listen(5000);

