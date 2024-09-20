const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Employee = require('./db/Employee');
const app = express();
app.use(cors()); 
app.use(express.json());

app.post("/signup",
    [
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
        body('name')
          .isLength({ min: 3 })
          .withMessage('Username must be at least 3 characters long')
          .custom(async (name) => {
            const existingUser = await User.findOne({ name });
            if (existingUser) {
              throw new Error('Username already in use');
            }
            return true;
          }),
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          email,
          name,
          password: hashedPassword,
        });

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
    body('name')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ], async (req, res)=>{
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const {name, password} = req.body;

  try{
    const user = await User.findOne({name});
    if(!user){
      return res.status(400).json({ errors: [{msg:"Invalid username or password"}]});
    }
    console.log("username match");
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

app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/create-employee', upload.single('image'), async (req, res) => {
  const { name, email, mobile, designation, gender, courses } = req.body;

  if (!name || !email || !mobile || !designation || !gender || !courses || !req.file) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      courses: courses.split(','),
      image: req.file.path,
    });

    await newEmployee.save();

    return res.status(200).json({ msg: 'Registration successful!', employee: newEmployee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

app.get('/emp-list', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.get('/api/users/:id', async (req, resp)=>{
  let result = await Employee.findOne({_id:req.params.id});
  if(result){
      resp.send(result)
  }else{
      resp.send({result:"No record found"})
  }
})

app.put('/api/users/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses, image } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        mobile,
        designation,
        gender,
        courses: courses.split(','), // Convert string to array
        image,
      },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/emp-list/:id", async (req, resp)=>{
  const result = await Employee.deleteOne({_id:req.params.id})
  resp.send(result)
})

app.get("/search/:key", async (req, resp)=>{
  let result = await Employee.find({
          "$or" : [
              {name: { $regex : req.params.key}},
              {email: { $regex : req.params.key}},
              {date: { $regex : req.params.key}}              
          ]
      });
  resp.send(result)
})

app.listen(5000);