const axios = require('axios');

async function geocode(lat, lng) {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat,
        lon: lng,
        format: 'json',
        addressdetails: 1,
      },
    });

    const address = response.data.address;
    // For India, district might be in county or state_district
    const district = address.county || address.state_district || address.city_district;
    return district;
  } catch (error) {
    console.error('Geocoding error:', error.message);
    return null;
  }
}

module.exports = geocode;
