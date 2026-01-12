import api from "../services/api";
import "../dashboard.css";

const SeedButton = ({ onSeedComplete }) => {
  const handleSeed = async () => {
    await api.post("/seed/traffic?count=200");
    onSeedComplete();
  };

  return (
    <button className="button" onClick={handleSeed}>
      ➕ Generate Demo Traffic Data
    </button>
  );
};

export default SeedButton;
