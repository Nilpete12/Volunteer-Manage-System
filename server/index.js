const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load Config
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// --- ROUTE IMPORTS ---
const campaignRoutes = require('./routes/campaignRoutes'); 
const authRoutes = require('./routes/auth'); // <--- NEW: Import the Auth file

// --- USE ROUTES ---
app.use('/api/campaigns', campaignRoutes); 
app.use('/api/auth', authRoutes);            // <--- NEW: Connect the Auth route

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});