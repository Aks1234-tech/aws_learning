import { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  HIGH: "#ef4444",
  MEDIUM: "#f59e0b",
  LOW: "#22c55e",
};

const AnalyticsCharts = () => {
  const [peakHour, setPeakHour] = useState(null);
  const [congestionData, setCongestionData] = useState([]);

  useEffect(() => {
    api.get("/analytics/peak-hour").then((res) => setPeakHour(res.data));
    api.get("/analytics/congestion-summary").then((res) =>
      setCongestionData(res.data)
    );
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3>📊 Traffic Analytics</h3>

      {/* Peak Hour */}
      {peakHour && (
        <p>
          🚦 <strong>Peak Traffic Hour:</strong> {peakHour.peak_hour}:00 (
          {peakHour.records} records)
        </p>
      )}

      <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
        {/* Congestion Pie Chart */}
        <div style={{ width: "50%", height: 300 }}>
          <h4>Congestion Distribution</h4>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={congestionData}
                dataKey="count"
                nameKey="congestion_level"
                outerRadius={100}
                label
              >
                {congestionData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[entry.congestion_level]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div style={{ width: "50%", height: 300 }}>
          <h4>Congestion Count</h4>
          <ResponsiveContainer>
            <BarChart data={congestionData}>
              <XAxis dataKey="congestion_level" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
