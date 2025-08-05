// script.js

// Import everything from the ESM build under the L namespace
import * as L from 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet-src.esm.js';

// Create the map instance and set a default view
const map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Geolocation: one-time position lookup
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const { latitude: lat, longitude: lon, accuracy } = coords;

      // Center map and add a marker
      map.setView([lat, lon], 15);
      L.marker([lat, lon])
        .addTo(map)
        .bindPopup('You are here!')
        .openPopup();

      // Draw accuracy circle
      L.circle([lat, lon], {
        radius: accuracy,        // radius in meters
        color: '#136AEC',        // stroke color
        fillColor: '#136AEC',    // fill color
        fillOpacity: 0.2,        // semi-transparent fill
        weight: 2                // stroke width
      })
        .addTo(map)
        .bindPopup(`Accuracy: ${accuracy.toFixed(1)} m`);
    },
    (err) => {
      console.error('Geolocation error:', err);
      alert('Could not get your location: ' + err.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,      // give up after 5 seconds
      maximumAge: 0       // do not use a cached position
    }
  );
} else {
  alert('Geolocation is not supported by your browser.');
}
