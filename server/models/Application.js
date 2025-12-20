import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  regNumber: { type: String, required: true },
  
  repName: { type: String, required: true },
  repEmail: { type: String, required: true },
  repPhone: { type: String, required: true },
  
  bankDetails: {
    accountName: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String
  },
  
  // We store the full campaign proposal here
  campaignData: { type: Object, required: true },
  
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model('Application', ApplicationSchema);