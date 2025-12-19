const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  campaign: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign',
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  type: {
    type: String,
    enum: ['money', 'items'],
    default: 'money'
  },
  description: { type: String }, // For item donations (e.g., "50 Blankets")
  
  paymentId: { type: String }, // Transaction ID from Stripe/Razorpay
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  }
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);