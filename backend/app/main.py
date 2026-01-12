from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import traffic, analytics, seed
from app.core.database import engine
from app.models import traffic as traffic_model

# Create tables
traffic_model.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Urban Flow Traffic API",
    version="1.0.0"
)

# Enable CORS (required for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(traffic.router)
app.include_router(analytics.router)
app.include_router(seed.router)

@app.get("/")
def root():
    return {"status": "Urban Flow Backend Running"}
