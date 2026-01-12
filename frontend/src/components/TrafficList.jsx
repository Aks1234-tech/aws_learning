import { useEffect, useState } from "react";
import api from "../services/api";
import "../dashboard.css";

const TrafficList = ({ refreshKey }) => {
  const [traffic, setTraffic] = useState([]);

  const fetchTraffic = () => {
    api.get("/traffic/all").then((res) => setTraffic(res.data));
  };

  useEffect(() => {
    fetchTraffic();
  }, []);

  useEffect(() => {
    if (refreshKey !== undefined) fetchTraffic();
  }, [refreshKey]);

  return (
    <div className="card">
      <h3>Live Traffic Records</h3>

      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Vehicles</th>
            <th>Avg Speed</th>
            <th>Congestion</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {traffic.map((t) => (
            <tr key={t.id}>
              <td>{t.location}</td>
              <td>{t.vehicle_count}</td>
              <td>{t.avg_speed}</td>
              <td
                className={
                  t.congestion_level === "HIGH"
                    ? "high"
                    : t.congestion_level === "MEDIUM"
                    ? "medium"
                    : "low"
                }
              >
                {t.congestion_level}
              </td>
              <td>{new Date(t.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrafficList;
