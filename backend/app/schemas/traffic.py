from pydantic import BaseModel
from datetime import datetime

class TrafficCreate(BaseModel):
    location: str
    vehicle_count: int
    avg_speed: float

class TrafficResponse(TrafficCreate):
    id: int
    congestion_level: str
    timestamp: datetime

    class Config:
        from_attributes = True
