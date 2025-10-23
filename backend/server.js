const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const dataRoutes = require('./routes/data');
const fetchData = require('./utils/fetchData');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mgnrega', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/data', dataRoutes);

// Schedule data fetching every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Fetching latest MGNREGA data...');
  fetchData();
});

// Initial data fetch on startup
fetchData();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
