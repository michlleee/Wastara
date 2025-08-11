import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function LeafletMap({ latitude, longitude, onLocationChange }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current && latitude && longitude) {
      mapRef.current = L.map("map").setView([latitude, longitude], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      markerRef.current = L.marker([latitude, longitude], { draggable: true })
        .addTo(mapRef.current)
        .bindPopup("Move me!")
        .openPopup();

      markerRef.current.on("dragend", function () {
        const position = markerRef.current.getLatLng();
        if (onLocationChange) {
          onLocationChange(position.lat, position.lng);
        }
      });
    }
  }, [latitude, longitude, onLocationChange]);

  useEffect(() => {
    if (markerRef.current && latitude && longitude) {
      markerRef.current.setLatLng([latitude, longitude]);
    }
  }, [latitude, longitude]);

  return <div style={{ height: "40vh", width: "100%" }} id="map"></div>;
}
