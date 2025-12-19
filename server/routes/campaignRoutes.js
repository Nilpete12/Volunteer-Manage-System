const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

// @desc    Get all campaigns
// @route   GET /api/campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get a single campaign by ID
// @route   GET /api/campaigns/:id
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (campaign) {
      res.json(campaign);
    } else {
      res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;