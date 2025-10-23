const mongoose = require('mongoose');

const mgnregaDataSchema = new mongoose.Schema({
  state_name: String,
  district_name: String,
  fin_year: String,
  total_jobcards: Number,
  total_workers: Number,
  fetched_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MgnregaData', mgnregaDataSchema);
