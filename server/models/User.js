import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['volunteer', 'admin'],
    default: 'volunteer',
  },
  // We can track their impact here
  hoursContributed: { type: Number, default: 0 },
  campaignsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }]
}, { timestamps: true });

export default mongoose.model('User', UserSchema);