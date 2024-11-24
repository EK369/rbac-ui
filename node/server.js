const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const Role = require('./models/role');

const app = express();


app.use(cors());
app.use(express.json()); // Middleware to parse incoming JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost/rbac', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Create a new user (POST)
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, firstName, lastName, phone, role, status } = req.body;

    // Check if the role exists
    const foundRole = await Role.findById(role);
    if (!foundRole) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      firstName,
      lastName,
      phone,
      role, // Ensure the role is a valid ID
      status,
    });

    await newUser.save();
    const populatedUser = await newUser.populate('role'); // Populate role before sending
    res.status(201).json(populatedUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users (GET)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().populate('role', 'name'); // Populate role with only the name field
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update a user (PUT)
app.put('/api/users/:id', async (req, res) => {
  const { username, email, firstName, lastName, phone, role, status } = req.body;

  try {
    const foundRole = await Role.findById(role);
    if (!foundRole) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, firstName, lastName, phone, role, status },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user' });
  }
});

// Delete a user (DELETE)
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Create a new role (POST)
app.post('/api/roles', async (req, res) => {
  const { name, permissions } = req.body;
  const role = new Role({ name, permissions });

  try {
    const newRole = await role.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).json({ message: 'Error creating role' });
  }
});

// Get all roles (GET)
app.get('/api/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching roles' });
  }
});

// Get a specific role by ID (GET)
app.get('/api/roles/:id', async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json(role);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching role' });
  }
});

// Delete Role (DELETE)
app.delete('/api/roles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Role.findByIdAndDelete(id); // Using Mongoose for MongoDB
    if (!result) return res.status(404).json({ message: 'Role not found' });
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Role (PUT)
app.put('/api/roles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRole = await Role.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRole) return res.status(404).json({ message: 'Role not found' });
    res.json(updatedRole);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
