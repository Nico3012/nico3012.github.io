// Import everything from the ESM build under the L namespace
import * as L from 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet-src.esm.js';

// Create map and set an initial view
const map = L.map('map').setView([0, 0], 2);

// Add the OSM tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Geolocation: one-time position lookup
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const { latitude: lat, longitude: lon } = coords;
      map.setView([lat, lon], 15);
      L.marker([lat, lon]).addTo(map)
        .bindPopup('You are here!')
        .openPopup();
    },
    (err) => {
      console.error('Geolocation error:', err);
      alert('Could not get your location: ' + err.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,      // give up after 5 s
      maximumAge: 0       // do not use a cached position
    }
  );
} else {
  alert('Geolocation is not supported by your browser.');
}
