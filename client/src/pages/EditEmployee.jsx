import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EmployeeForm.css'

const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: 'HR',
    gender: 'Male',
    courses: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${params.id}`);
        const data = await response.json();
        setUserData(data);
        setUpdatedUser({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          designation: data.designation,
          gender: data.gender,
          courses: data.courses,
          image: data.image,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      courses: checked
        ? [...prevState.courses, value]
        : prevState.courses.filter((course) => course !== value),
    }));
  };

  const handleFileChange = (e) => {
    setUpdatedUser((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };


  const validate = () => {
    const newErrors = {};

    if (!updatedUser.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!updatedUser.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(updatedUser.email)) {
      newErrors.email = 'Invalid email format';
    }

    const mobilePattern = /^\d{10}$/;
    if (!updatedUser.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobilePattern.test(updatedUser.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }

    if (updatedUser.courses.length === 0) {
      newErrors.courses = 'At least one course must be selected';
    }

    if (!updatedUser.image) {
      newErrors.image = 'Profile picture is required';
    } else if (!['image/jpeg', 'image/png'].includes(updatedUser.image.type)) {
      newErrors.image = 'Only JPEG or PNG images are allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSaveChanges = async () => {
    if (!validate()) {
      return; 
    }

    const formData = new FormData();
    for (const key in updatedUser) {
      formData.append(key, updatedUser[key]);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${params.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        alert('User updated successfully');
        navigate('/employee-list');
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='emp-form'>
      <h2>Edit Employee</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={updatedUser.name}
          onChange={handleInputChange}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={updatedUser.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div>
        <label>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={updatedUser.mobile}
          onChange={handleInputChange}
          required
        />
        {errors.mobile && <p className="error">{errors.mobile}</p>}
      </div>

      <div>
        <label>Designation:</label>
        <select
          name="designation"
          value={updatedUser.designation}
          onChange={handleInputChange}
        >
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <div>
        <label>Gender:</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={updatedUser.gender === 'Male'}
            onChange={handleInputChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={updatedUser.gender === 'Female'}
            onChange={handleInputChange}
          />
          Female
        </label>
      </div>

      <div>
        <label>Courses:</label>
        <label>
          <input
            type="checkbox"
            value="BCA"
            checked={updatedUser.courses.includes('BCA')}
            onChange={handleCheckboxChange}
          />
          BCA
        </label>
        <label>
          <input
            type="checkbox"
            value="MCA"
            checked={updatedUser.courses.includes('MCA')}
            onChange={handleCheckboxChange}
          />
          MCA
        </label>
        <label>
          <input
            type="checkbox"
            value="Bsc"
            checked={updatedUser.courses.includes('Bsc')}
            onChange={handleCheckboxChange}
          />
          Bsc
        </label>
        {errors.courses && <p className="error">{errors.courses}</p>}
      </div>

      <div>
        <label>Profile Picture:</label>
        <input type="file" name="image" onChange={handleFileChange} />
        {errors.image && <p className="error">{errors.image}</p>}
      </div>

      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default EditEmployee;
