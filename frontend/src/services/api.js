import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getDistricts = async (state) => {
  const response = await axios.get(`${API_BASE_URL}/data/districts/${state}`);
  return response.data;
};

export const getDistrictData = async (district) => {
  const response = await axios.get(`${API_BASE_URL}/data/district/${district}`);
  return response.data;
};

export const getLocationDistrict = async (lat, lng) => {
  const response = await axios.get(`${API_BASE_URL}/data/location`, {
    params: { lat, lng },
  });
  return response.data;
};
