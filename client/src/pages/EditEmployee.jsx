import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EmployeeForm.css';

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
    courses: [],
    image: '',
  });

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
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedCourses = checked
      ? [...updatedUser.courses, value]
      : updatedUser.courses.filter((course) => course !== value);
    setUpdatedUser({
      ...updatedUser,
      courses: updatedCourses,
    });
  };

  const handleFileChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async () => {
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
        setUserData(updatedData); // Update the state with the new data
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
    <div className="emp-form">
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
      </div>

      <div>
        <label>Mobile:</label>
        <input
          type="tel"
          name="mobile"
          value={updatedUser.mobile}
          onChange={handleInputChange}
          required
        />
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
            name="courses"
            value="BCA"
            checked={updatedUser.courses.includes('BCA')}
            onChange={handleCheckboxChange}
          />
          BCA
        </label>
        <label>
          <input
            type="checkbox"
            name="courses"
            value="MCA"
            checked={updatedUser.courses.includes('MCA')}
            onChange={handleCheckboxChange}
          />
          MCA
        </label>
        <label>
          <input
            type="checkbox"
            name="courses"
            value="Bsc"
            checked={updatedUser.courses.includes('Bsc')}
            onChange={handleCheckboxChange}
          />
          Bsc
        </label>
      </div>

      <div>
        <label>Profile Picture:</label>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>

      <button type="button" onClick={handleSubmit}>
        Save Changes
      </button>
    </div>
  );
};

export default EditEmployee;
