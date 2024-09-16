import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import SearchFilter from "./SearchFilter";
export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(()=>{
    fetchData();
  },[])

    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/emp-list');
      const data = await response.json();
      setEmployees(data);
    };

        const deleteEmployee= async (id)=>{
       let result = await fetch(`http://localhost:5000/emp-list/${id}`,{
        method:'Delete',
        });
        result = await result.json();
        if(result){
            fetchData();
        }
      }
      const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result  = await fetch(`http://localhost:5000/search/${key}`)
            result = await result.json();
            if(result){
                setEmployees(result)
            }
        }else{
            fetchData();
        }
      
    }

  return (
   <div>
     <div className="home-page">
      <h3>Employee List</h3>
    </div>
    {/* <UserGrid/> */}
    <div className="emp-link">
      <div className="emp-li">
      
      <div className='search-box'><label htmlFor="search">Search </label> <input className='search-box' type='text' placeholder='Enter Search keyword' onChange={searchHandle}/></div>
      <p>Total Count: {employees.length}</p>
      <Link to='/create-employee'>Create Employee</Link>
      </div>
    </div>
    <div className="emp-table">
      <hr/>
      {employees.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Uid</th>              
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Courses</th>
              <th>Create date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id}>
                <td>{index + 1}</td>
                <td><img src={`http://localhost:5000/${employee.image}`} alt="User" width="80" height='60' /></td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.courses.join(', ')}</td>
                <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                <td><li><Link to={'/edit-emp/'+employee._id}>Edit</Link> - <button onClick={()=>deleteEmployee(employee._id)}>Delete</button></li></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
   </div>
  );
}
