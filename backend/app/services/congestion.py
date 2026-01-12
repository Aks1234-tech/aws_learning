def calculate_congestion(vehicle_count: int, avg_speed: float) -> str:
    if avg_speed < 20 or vehicle_count > 100:
        return "HIGH"
    elif 20 <= avg_speed <= 40 or 50 <= vehicle_count <= 100:
        return "MEDIUM"
    else:
        return "LOW"
