const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // We store the URL
  category: { 
    type: String, 
    required: true,
    enum: ['Environment', 'Education', 'Disaster Relief', 'Animal Welfare', 'Medical', 'Other'] 
  },
  location: { type: String, required: true },
  organizer: { type: String, required: true }, // e.g. "EcoLife Foundation"
  
  // Financials
  goal: { type: Number, required: true },
  raised: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
  
  // Volunteers logic
  volunteersNeeded: { type: Number, required: true },
  volunteersRegistered: { type: Number, default: 0 },
  
  // Complex Data (Arrays)
  budget: [{
    item: String,
    cost: Number
  }],
  shifts: [{
    date: String,
    time: String,
    task: String,
    slotsAvailable: Number,
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }],
  
  // Verification Status
  isVerified: { type: Boolean, default: false },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);