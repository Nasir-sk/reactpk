
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeForm.css'
const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [courses, setCourses] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    
    const errors = {};
    
    if (!name) {
      errors.name = "Username is required";
    } else if (name.length < 3) {
      errors.name = "Username must be at least 3 characters";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (! /^[^\@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email formate";
    }
    if(!mobile){
      errors.mobile = "Mobile number is required"
    }else if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = "Mobile number must be 10 digits long.";
    }
    if (!designation) errors.designation = 'Designation is required';
    if (!gender) errors.gender = 'Gender is required';
    if (courses.length === 0) errors.courses = 'At least one course must be selected';
    if (!image) errors.image = 'Image is required';
    if (image && !['image/jpeg', 'image/png'].includes(image.type)) {
      errors.image = "Only JPG or PNG files are allowed.";
    }


    return errors;
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCourses([...courses, value]);
    } else {
      setCourses(courses.filter((course) => course !== value));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // FormData object for file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('courses', courses);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/create-employee', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        navigate('/employee-list'); // Redirect to the display page
      } else {
        alert(result.msg || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting the form');
    }
  };

  return (
    <div className='emp-form'>
      <h2>Create Employee</h2>

      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div>
        <label>Mobile No:</label>
        <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile}</p>}
      </div>

      <div>
        <label>Designation:</label>
        <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
        {errors.designation && <p style={{ color: 'red' }}>{errors.designation}</p>}
      </div>

      <div>
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          onChange={(e) => setGender(e.target.value)}
        />Male 
        <input
          type="radio"
          name="gender"
          value="Female"
          onChange={(e) => setGender(e.target.value)}
        />Female
        {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
      </div>

      <div>
        <label>Courses:</label>
        <input
          type="checkbox"
          value="BCA"
          onChange={handleCourseChange}
        />BCA
        <input
          type="checkbox"
          value="MCA"
          onChange={handleCourseChange}
        />MCA
        <input
          type="checkbox"
          value="Bsc"
          onChange={handleCourseChange}
        />Bsc
        {errors.courses && <p style={{ color: 'red' }}>{errors.courses}</p>}
      </div>

      <div>
        <label>Upload Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateEmployee;
