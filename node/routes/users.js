const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Role = require('../models/role');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, firstName, lastName, phone, role, status } = req.body;

    // Validate the role ID
    const roleExists = await Role.findById(role);
    if (!roleExists) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    const user = new User({ username, email, firstName, lastName, phone, role, status });
    await user.save();
    const populatedUser = await user.populate('role', 'name'); // Populate role before sending
    res.status(201).json(populatedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Fetch roles for the dropdown
router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('role', 'name');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const { username, email, firstName, lastName, phone, role, status } = req.body;

    // Validate the role ID
    const roleExists = await Role.findById(role);
    if (!roleExists) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, firstName, lastName, phone, role, status },
      { new: true }
    ).populate('role', 'name'); // Populate role after updating
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;