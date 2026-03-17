const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const dentistRoutes = require('./routes/dentistRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/dentists', dentistRoutes);
app.use('/api/auth', authRoutes);

// Protected routes (admin only)
app.use('/api/appointments', verifyToken, appointmentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((e) => console.log('DB connection error:', e));