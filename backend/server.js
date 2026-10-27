const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend service is healthy' });
});

app.use('/api/employees', require('./routes/employeesRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});