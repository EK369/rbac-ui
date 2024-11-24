import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    permissions: [], // Permissions will be an array
  });
  
  const [editingRole, setEditingRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const permissionsList = ['read', 'write', 'delete', 'manage']; // Example permissions list

  // Fetch roles from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/roles')
      .then((res) => res.json())
      .then((data) => {
        setRoles(data); // Set roles fetched from the backend
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePermissionsChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, permissions: value }); // Update permissions in formData
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingRole
      ? `http://localhost:5000/api/roles/${editingRole._id}`
      : 'http://localhost:5000/api/roles';
    const method = editingRole ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editingRole) {
          setRoles(roles.map((role) => (role._id === data._id ? data : role))); // Update the edited role
        } else {
          setRoles([...roles, data]); // Add the new role to the list
        }
        setFormData({
          name: '',
          permissions: [], // Reset form data
        });
        setEditingRole(null); // Clear editing state
        setErrorMessage(''); // Clear any previous error messages
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('An error occurred while saving the role. Please try again.');
      });
  };

  const handleEdit = (role) => {
    setEditingRole(role); // Set the role being edited
    setFormData({
      name: role.name,
      permissions: role.permissions || [], // Pre-fill permissions
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      fetch(`http://localhost:5000/api/roles/${id}`, { method: 'DELETE' })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to delete role: ${response.statusText}`);
          }
          setRoles(roles.filter((role) => role._id !== id)); // Remove the deleted role
        })
        .catch((err) => {
          console.error('Error deleting role:', err);
          setErrorMessage('An error occurred while deleting the role. Please try again.');
        });
    }
  };

  return (
    <div>
      <Typography variant="h4" marginTop={4} gutterBottom>
        {editingRole ? 'Edit Role' : 'Create a New Role'}
      </Typography>

      {errorMessage && <Typography color="error">{errorMessage}</Typography>} {/* Display error message */}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Role Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Permissions</InputLabel>
              <Select
                multiple
                name="permissions"
                value={formData.permissions} // Persist selected permissions
                onChange={handlePermissionsChange}
                label="Permissions"
              >
                {permissionsList.map((permission, index) => (
                  <MenuItem key={index} value={permission}>
                    {permission}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
          {editingRole ? 'Update Role' : 'Create Role'}
        </Button>
      </form>

      <Typography variant="h4" gutterBottom sx={{ marginTop: 10, marginBottom:3 }}>
        Role List
      </Typography>
      <Box>
        {roles.length > 0 ? (
          <Grid container spacing={3}>
            {roles.map((role) => (
              <Grid item xs={12} sm={6} key={role._id}>
                <Box sx={{ border: '1px solid #ccc', padding: 2 }}>
                  <Typography variant="h6">{role.name}</Typography>
                  <p>
                    <strong>Permissions:</strong> {(role.permissions || []).join(', ')}
                  </p>
                  <Button variant="contained" color="secondary" onClick={() => handleEdit(role)}>
                    Edit
                  </Button>
                  <Link
                    to="#"
                    onClick={() => handleDelete(role._id)}
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      backgroundColor: 'red',
                      position: 'absolute',
                      marginLeft: '15px',
                      padding: '6px 16px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      display: 'inline-block',
                    }}
                  >
                    Delete
                  </Link>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>No roles found.</p>
        )}
      </Box>
    </div>
  );
};

export default Roles;






