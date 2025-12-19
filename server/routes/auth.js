const express = require('express');
const router = express.Router(); // <--- THIS WAS MISSING
const User = require('../models/User');

// REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Create new user
    const newUser = new User({
      name,
      email,
      password,
      role: role || 'volunteer'
    });

    await newUser.save();

    // 3. Send Token (Auto-Login)
    res.status(201).json({
      message: "User created successfully",
      token: "fake-jwt-token-12345", 
      user: { id: newUser._id, name: newUser.name, role: newUser.role }
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // 2. Check password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Success
    res.json({
      token: "fake-jwt-token-12345",
      user: { id: user._id, name: user.name, role: user.role }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;