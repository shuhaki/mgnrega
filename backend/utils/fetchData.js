const axios = require('axios');
const MgnregaData = require('../models/MgnregaData');

const API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
const BASE_URL = 'https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722';

async function fetchData() {
  try {
    const state = 'UTTAR PRADESH';
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get(BASE_URL, {
        params: {
          'api-key': API_KEY,
          format: 'json',
          'filters[state_name]': state,
          offset: offset,
          limit: 100,
        },
      });

      const records = response.data.records || [];

      if (records.length === 0) {
        hasMore = false;
      } else {
        for (const record of records) {
          await MgnregaData.findOneAndUpdate(
            { state_name: record.state_name, district_name: record.district_name, fin_year: record.fin_year },
            {
              total_jobcards: parseInt(record['Total_No_of_JobCards_issued']) || 0,
              total_workers: parseInt(record['Total_No_of_Workers']) || 0,
              fetched_at: new Date(),
            },
            { upsert: true, new: true }
          );
        }
        offset += 100;
      }
    }

    console.log('Data fetched and cached successfully');
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

module.exports = fetchData;
