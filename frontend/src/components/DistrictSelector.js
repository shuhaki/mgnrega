import React, { useState, useEffect } from 'react';

function DistrictSelector({ onSelect, autoDetected }) {
  const [districts, setDistricts] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (autoDetected) {
      setSelected(autoDetected);
      onSelect(autoDetected);
    }
  }, [autoDetected, onSelect]);

  const fetchDistricts = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/data/districts/UTTAR PRADESH');
      const data = await response.json();
      setDistricts(data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const handleSelect = (district) => {
    setSelected(district);
    onSelect(district);
  };

  return (
    <div className="district-selector">
      <h2>Select Your District</h2>
      {autoDetected && (
        <p>We detected you might be in: <strong>{autoDetected}</strong></p>
      )}
      <select value={selected} onChange={(e) => handleSelect(e.target.value)}>
        <option value="">Choose a district...</option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
      <button onClick={() => handleSelect(selected)}>View Data</button>
    </div>
  );
}

export default DistrictSelector;
