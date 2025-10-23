const express = require('express');
const MgnregaData = require('../models/MgnregaData');
const geocode = require('../utils/geocode');

const router = express.Router();

// Get districts for a state
router.get('/districts/:state', async (req, res) => {
  try {
    const { state } = req.params;
    const districts = await MgnregaData.distinct('district_name', { state_name: state });
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch districts' });
  }
});

// Get data for a district
router.get('/district/:district', async (req, res) => {
  try {
    const { district } = req.params;
    const data = await MgnregaData.find({ district_name: district }).sort({ fin_year: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch district data' });
  }
});

// Get district from coordinates
router.get('/location', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const district = await geocode(lat, lng);
    res.json({ district });
  } catch (error) {
    res.status(500).json({ error: 'Failed to geocode location' });
  }
});

module.exports = router;
