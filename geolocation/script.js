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

// Geolocation: live position updates
let marker = null;
let accuracyCircle = null;

if ('geolocation' in navigator) {
  navigator.geolocation.watchPosition(
    ({ coords }) => {
      const { latitude: lat, longitude: lon, accuracy } = coords;

      // Center map on first update
      if (!marker) {
        map.setView([lat, lon], 15);
      }

      // Update or create marker
      if (marker) {
        marker.setLatLng([lat, lon]);
      } else {
        marker = L.marker([lat, lon])
          .addTo(map)
          .bindPopup('You are here!')
          .openPopup();
      }

      // Update or create accuracy circle
      if (accuracyCircle) {
        accuracyCircle.setLatLng([lat, lon]);
        accuracyCircle.setRadius(accuracy);
        accuracyCircle.setPopupContent(`Accuracy: ${accuracy.toFixed(1)} m`);
      } else {
        accuracyCircle = L.circle([lat, lon], {
          radius: accuracy,
          color: '#136AEC',
          fillColor: '#136AEC',
          fillOpacity: 0.2,
          weight: 2
        })
          .addTo(map)
          .bindPopup(`Accuracy: ${accuracy.toFixed(1)} m`);
      }
    },
    (err) => {
      console.error('Geolocation error:', err);
      alert('Could not get your location: ' + err.message);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0
    }
  );
} else {
  alert('Geolocation is not supported by your browser.');
}
