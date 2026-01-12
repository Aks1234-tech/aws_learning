from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.core.database import Base

class TrafficData(Base):
    __tablename__ = "traffic_data"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String(100), nullable=False)
    vehicle_count = Column(Integer, nullable=False)
    avg_speed = Column(Float, nullable=False)
    congestion_level = Column(String(20), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
