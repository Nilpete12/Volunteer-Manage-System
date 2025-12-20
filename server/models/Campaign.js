import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  // --- Basic Info ---
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // Ensure your form sends this!
  location: { type: String, required: true }, // Ensure your form sends this!
  image: { type: String, required: true },
  deadline: { type: Date, required: true },
  
  // --- Organization Info ---
  organizer: { type: String, required: true }, 
  regNumber: { type: String },
  website: { type: String },
  establishedYear: { type: Number },

  // --- Representative Info ---
  repName: { type: String },
  repEmail: { type: String },
  repPhone: { type: String },
  repPosition: { type: String },

  // --- Financial Stats ---
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  volunteersNeeded: { type: Number, default: 0 },
  volunteersRegistered: { type: Number, default: 0 },

  // --- The Budget Array ---
  budget: [{
    item: String,
    cost: Number
  }],

  // --- Bank Info ---
  accountName: { type: String },
  accountNumber: { type: String },
  bankName: { type: String },
  ifscCode: { type: String },

  // --- NEW: APPROVAL SYSTEM STATUS ---
  status: { 
    type: String, 
    enum: ['active', 'pending'], 
    default: 'pending' // Everyone starts as Pending by default
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Campaign', campaignSchema);