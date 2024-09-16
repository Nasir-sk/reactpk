import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchUsers();
  }, [search, page, sortField, sortOrder]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        params: {
          search,
          page,
          limit,
          sortField,
          sortOrder,
        },
      });
      setUsers(response.data.docs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const toggleActive = async (id, isActive) => {
    try {
      await axios.put(`http://localhost:5000/api/users/active/${id}`, {
        isActive: !isActive,
      });
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <h2>User List</h2>

      <input
        type="text"
        placeholder="Search by name, email, ID or date"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="user-grid-header">
        <button onClick={() => handleSort('name')}>
          Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSort('email')}>
          Email {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSort('_id')}>
          ID {sortField === '_id' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSort('createdAt')}>
          Date {sortField === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {users.map((user) => (
        <div key={user._id} className="user-grid-row">
          <span>{user.name}</span>
          <span>{user.email}</span>
          <span>{user._id}</span>
          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          <button onClick={() => toggleActive(user._id, user.isActive)}>
            {user.isActive ? 'Deactivate' : 'Activate'}
          </button>
          <button onClick={() => handleDelete(user._id)}>Delete</button>
        </div>
      ))}

      <div className="pagination-controls">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => setPage(index + 1)} disabled={page === index + 1}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserGrid;
