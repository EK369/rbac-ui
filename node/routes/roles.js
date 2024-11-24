// routes/roles.js

const express = require('express');
const Role = require('../models/role'); // Import your Role model
const router = express.Router();

// Allowed permissions for validation
const allowedPermissions = ['read', 'write', 'delete', 'manage'];

// GET all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching roles' });
  }
});

// POST create new role
router.post('/', async (req, res) => {
  const { name, permissions } = req.body;

  // Validate name
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Name is required and must be a string' });
  }

  // Validate permissions (optional, if provided)
  if (permissions && (!Array.isArray(permissions) || !permissions.every((p) => allowedPermissions.includes(p)))) {
    return res.status(400).json({ message: 'Invalid permissions' });
  }

  const newRole = new Role({ name, permissions });

  try {
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (err) {
    res.status(500).json({ message: 'Error creating role' });
  }
});

// GET a role by ID
router.get('/:id', async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching role' });
  }
});

// DELETE a role by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting role' });
  }
});

// PUT update a role by ID
router.put('/:id', async (req, res) => {
  const { name, permissions } = req.body;

  // Validate name if provided
  if (name && typeof name !== 'string') {
    return res.status(400).json({ message: 'Name must be a string' });
  }

  // Validate permissions if provided
  if (
    permissions &&
    (!Array.isArray(permissions) || !permissions.every((p) => allowedPermissions.includes(p)))
  ) {
    return res.status(400).json({ message: 'Invalid permissions' });
  }

  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(updatedRole);
  } catch (err) {
    res.status(500).json({ message: 'Error updating role' });
  }
});

module.exports = router;
