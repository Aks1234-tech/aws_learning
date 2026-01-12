from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.traffic import TrafficData
from app.schemas.traffic import TrafficCreate
from app.core.deps import get_db
from app.services.congestion import calculate_congestion

router = APIRouter(prefix="/traffic", tags=["Traffic"])

@router.post("/add")
def add_traffic(data: TrafficCreate, db: Session = Depends(get_db)):
    congestion = calculate_congestion(
        vehicle_count=data.vehicle_count,
        avg_speed=data.avg_speed
    )

    traffic = TrafficData(
        location=data.location,
        vehicle_count=data.vehicle_count,
        avg_speed=data.avg_speed,
        congestion_level=congestion
    )

    db.add(traffic)
    db.commit()
    db.refresh(traffic)

    return traffic

@router.get("/all")
def get_all_traffic(db: Session = Depends(get_db)):
    return db.query(TrafficData).order_by(TrafficData.timestamp.desc()).all()
