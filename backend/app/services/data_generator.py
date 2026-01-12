import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.traffic import TrafficData
from app.services.congestion import calculate_congestion

LOCATIONS = [
    "MG Road",
    "Ring Road Jaipur",
    "BRTS Corridor",
    "Airport Road",
    "Station Circle",
    "City Center",
    "Industrial Area",
    "University Road"
]

def random_timestamp(days_back: int = 7):
    return datetime.utcnow() - timedelta(
        days=random.randint(0, days_back),
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59)
    )

def generate_bulk_traffic(db: Session, count: int = 1000):
    records = []

    for _ in range(count):
        vehicle_count = random.randint(20, 180)
        avg_speed = round(random.uniform(10, 70), 2)
        congestion = calculate_congestion(vehicle_count, avg_speed)

        traffic = TrafficData(
            location=random.choice(LOCATIONS),
            vehicle_count=vehicle_count,
            avg_speed=avg_speed,
            congestion_level=congestion,
            timestamp=random_timestamp()
        )
        records.append(traffic)

    db.bulk_save_objects(records)
    db.commit()

    return {"inserted_records": count}
