const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// POST register (run only once to create admin)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create new admin
    const admin = new Admin({
      username: username,
      password: password
    });

    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin in database
    const admin = await Admin.findOne({ username: username });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check password
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token: token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;