import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: '', // Single role ID
    status: true, // Default to 'Active' (checked)
  });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users and roles from the backend
  useEffect(() => {
    // Fetch all users including populated roles
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.log(err));

    // Fetch roles
    fetch('http://localhost:5000/api/roles')
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.checked, // If checked, status will be true (Active), otherwise false (Inactive)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editingUser ? `http://localhost:5000/api/users/${editingUser._id}` : 'http://localhost:5000/api/users';
    const method = editingUser ? 'PUT' : 'POST';

    // Update the formData to set status as 'Active' or 'Inactive'
    const updatedData = {
      ...formData,
      status: formData.status ? 'Active' : 'Inactive', // Map boolean status to string
    };

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editingUser) {
          const updatedUsers = users.map((user) =>
            user._id === data._id ? { ...user, ...data } : user
          );
          setUsers(updatedUsers);
        } else {
          setUsers([...users, data]);
        }

        setFormData({
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          phone: '',
          role: '',
          status: true, // Default to 'Active'
        });
        setEditingUser(null);
        window.location.reload(); // Refresh the page after update
      })
      .catch((err) => console.error('Error submitting form:', err));
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role?._id || '', // Set the role ID if available
      status: user.status === 'Active', // Convert string to boolean for checkbox
    });
    setEditingUser(user);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' })
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => console.error('Error deleting user:', err));
  };

  return (
    <div>
      <Typography variant="h4" marginTop={'35px'} gutterBottom>
        {editingUser ? 'Edit User' : 'Create a New User'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role._id} value={role._id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.status}
                  onChange={handleCheckboxChange}
                  name="status"
                />
              }
              label={formData.status ? 'Active' : 'Inactive'}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
          {editingUser ? 'Update User' : 'Create User'}
        </Button>
      </form>

      <Typography variant="h4" gutterBottom sx={{ marginTop: 10, marginBottom: 3 }}>
        User List
      </Typography>
      <Box>
        {users.length > 0 ? (
          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} key={user._id}>
                <Box sx={{ border: '1px solid #ccc', padding: 2 }}>
                  <Typography variant="h6">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <p>
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.role ? user.role.name : 'No role assigned'}
                  </p>
                  <p>
                    <strong>Status:</strong> {user.status}
                  </p>
                  <Button variant="contained" color="secondary" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Link
                    to="#"
                    onClick={() => handleDelete(user._id)}
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      backgroundColor: 'red',
                      marginLeft: '15px',
                      padding: '7px 18px',
                      position: 'absolute',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                    }}
                  >
                    Delete
                  </Link>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>No users found.</p>
        )}
      </Box>
    </div>  
  );
};

export default Users;
