import { useState } from "react";
import Header from "../components/Header";
import SeedButton from "../components/SeedButton";
import AnalyticsCharts from "../components/AnalyticsCharts";
import TrafficList from "../components/TrafficList";
import TrafficMap from "../components/TrafficMap";
import "../dashboard.css";

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <Header />

      <div className="container">
        <SeedButton onSeedComplete={() => setRefreshKey((r) => r + 1)} />

        <div className="card">
          <AnalyticsCharts />
        </div>

        <TrafficMap refreshKey={refreshKey} />

        <TrafficList refreshKey={refreshKey} />
      </div>
    </>
  );
};

export default Dashboard;
