import express from 'express';
import Campaign from '../models/Campaign.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// ------------------------------------
// 1. CREATE A CAMPAIGN (Smart Logic)
// ------------------------------------
router.post('/', verifyToken, async (req, res) => {
  try {
    // Check who is creating the campaign
    // If the frontend sends 'admin' role, it goes Live ('active').
    // Otherwise, it defaults to 'pending'.
    const { userRole } = req.body; 
    const status = userRole === 'admin' ? 'active' : 'pending';

    const newCampaign = new Campaign({
      ...req.body, // Copy all form fields (title, goal, budget, etc.)
      status: status // Force the calculated status
    });

    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------------------------------------
// 2. GET ALL CAMPAIGNS (Admin sees all, Frontend filters them)
// ------------------------------------
router.get('/', async (req, res) => {
  try {
    // Sort by newest first (createdAt: -1)
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------------------------------------
// 3. GET SINGLE CAMPAIGN BY ID
// ------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------------------------------------
// 4. APPROVE CAMPAIGN (Admin Only - New!)
// ------------------------------------
router.put('/:id/approve', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (campaign) {
      campaign.status = 'active'; // Flip the switch to Active
      const updatedCampaign = await campaign.save();
      res.json(updatedCampaign);
    } else {
      res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------------------------------------
// 5. DONATE TO A CAMPAIGN
// ------------------------------------
router.put('/:id/donate', async (req, res) => {
  try {
    const { amount } = req.body; 
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Add donation and increment supporter count
    campaign.raisedAmount = (campaign.raisedAmount || 0) + Number(amount);
    campaign.volunteersRegistered = (campaign.volunteersRegistered || 0) + 1;

    const updatedCampaign = await campaign.save();
    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------------------------------------
// 6. DELETE CAMPAIGN (Needed for Admin Dashboard)
// ------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Campaign deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;