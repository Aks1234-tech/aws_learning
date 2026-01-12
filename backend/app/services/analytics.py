from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.traffic import TrafficData

def get_peak_hour(db: Session):
    result = (
        db.query(
            func.hour(TrafficData.timestamp).label("hour"),
            func.count(TrafficData.id).label("count")
        )
        .group_by(func.hour(TrafficData.timestamp))
        .order_by(func.count(TrafficData.id).desc())
        .first()
    )

    if result:
        return {"peak_hour": result.hour, "records": result.count}
    return {"peak_hour": None, "records": 0}


def get_average_speed_by_location(db: Session):
    results = (
        db.query(
            TrafficData.location,
            func.avg(TrafficData.avg_speed).label("avg_speed")
        )
        .group_by(TrafficData.location)
        .all()
    )

    return [
        {"location": r.location, "avg_speed": round(r.avg_speed, 2)}
        for r in results
    ]


def get_congestion_distribution(db: Session):
    results = (
        db.query(
            TrafficData.congestion_level,
            func.count(TrafficData.id).label("count")
        )
        .group_by(TrafficData.congestion_level)
        .all()
    )

    return [
        {"congestion_level": r.congestion_level, "count": r.count}
        for r in results
    ]
