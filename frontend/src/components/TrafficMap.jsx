import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../dashboard.css";

/* Fix default marker icon issue */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* Dummy coordinates for demo locations */
const LOCATION_COORDS = {
  "MG Road": [26.9124, 75.7873],
  "Ring Road Jaipur": [26.9221, 75.7789],
  "BRTS Corridor": [26.9055, 75.7997],
  "Airport Road": [26.8242, 75.8122],
  "Station Circle": [26.9196, 75.7877],
  "City Center": [26.9157, 75.7913],
  "Industrial Area": [26.8926, 75.8216],
  "University Road": [26.8617, 75.8121],
};

const TrafficMap = ({ refreshKey }) => {
  const [traffic, setTraffic] = useState([]);

  useEffect(() => {
    api.get("/traffic/all").then((res) => setTraffic(res.data));
  }, [refreshKey]);

  const getColor = (level) => {
    if (level === "HIGH") return "red";
    if (level === "MEDIUM") return "orange";
    return "green";
  };

  return (
    <div className="card">
      <h3>🗺️ Live Traffic Map</h3>

      <MapContainer
        center={[26.9124, 75.7873]} // Jaipur center
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {traffic.map((t) => {
          const coords = LOCATION_COORDS[t.location];
          if (!coords) return null;

          return (
            <Marker key={t.id} position={coords}>
              <Popup>
                <strong>{t.location}</strong>
                <br />
                Vehicles: {t.vehicle_count}
                <br />
                Avg Speed: {t.avg_speed}
                <br />
                <span style={{ color: getColor(t.congestion_level) }}>
                  Congestion: {t.congestion_level}
                </span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default TrafficMap;
