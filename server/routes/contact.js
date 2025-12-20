import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST a new message (Public)
router.post('/', async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all messages (Admin Only)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- NEW: DELETE a specific message by ID ---
router.delete('/:id', async (req, res) => {
  try {
    const deletedMessage = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "Inquiry deleted successfully from database" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;