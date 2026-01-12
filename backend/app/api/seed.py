from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.deps import get_db
from app.services.data_generator import generate_bulk_traffic

router = APIRouter(prefix="/seed", tags=["Data Seeder"])

@router.post("/traffic")
def seed_traffic_data(
    count: int = Query(500, ge=10, le=5000),
    db: Session = Depends(get_db)
):
    return generate_bulk_traffic(db, count)
