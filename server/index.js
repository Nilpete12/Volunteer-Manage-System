import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'; // <-- Add this line
import campaignRoutes from './routes/campaigns.js';
import applicationRoutes from './routes/applications.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/campaigns', campaignRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/contacts', contactRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch((err) => console.log('❌ MongoDB Error:', err));

// Test Route
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('VolunTrack API is Running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});