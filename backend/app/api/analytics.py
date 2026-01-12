from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.deps import get_db
from app.services.analytics import (
    get_peak_hour,
    get_average_speed_by_location,
    get_congestion_distribution
)

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/peak-hour")
def peak_hour(db: Session = Depends(get_db)):
    return get_peak_hour(db)

@router.get("/avg-speed")
def average_speed(db: Session = Depends(get_db)):
    return get_average_speed_by_location(db)

@router.get("/congestion-summary")
def congestion_summary(db: Session = Depends(get_db)):
    return get_congestion_distribution(db)
