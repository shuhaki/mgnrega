import React, { useState, useEffect } from 'react';
import DistrictSelector from './components/DistrictSelector';
import DataDashboard from './components/DataDashboard';
import './App.css';

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [autoDetectedDistrict, setAutoDetectedDistrict] = useState(null);

  useEffect(() => {
    // Try to auto-detect district
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`http://localhost:5002/api/data/location?lat=${latitude}&lng=${longitude}`);
          const data = await response.json();
          setAutoDetectedDistrict(data.district);
        } catch (error) {
          console.error('Error detecting location:', error);
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>MGNREGA District Performance</h1>
        <p>Understand how your district is performing in the Mahatma Gandhi National Rural Employment Guarantee Act</p>
      </header>
      <main>
        <DistrictSelector
          onSelect={setSelectedDistrict}
          autoDetected={autoDetectedDistrict}
        />
        {selectedDistrict && <DataDashboard district={selectedDistrict} />}
      </main>
    </div>
  );
}

export default App;
