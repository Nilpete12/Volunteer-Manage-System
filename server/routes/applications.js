import express from 'express';
import Application from '../models/Application.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// SUBMIT AN APPLICATION (Protected)

router.post('/', verifyToken, async (req, res) => {
  try {
    const newApp = new Application(req.body);
    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------------------------------------
// GET ALL APPLICATIONS (Admin only - for later)
// ------------------------------------
router.get('/', verifyToken, async (req, res) => {
  try {
    const apps = await Application.find();
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;