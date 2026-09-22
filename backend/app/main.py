from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routers import items as items_router
from pathlib import Path

app = FastAPI(title="Portfolio API")

# allow your frontend origins
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",   # add if you use Vite
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items_router.router)

@app.get("/api/v1/health")
def health():
    return {"status": "ok"}

@app.on_event("startup")
def on_startup():
    # ensure data dir exists (used by CRUD layer)
    base = Path(__file__).resolve().parent
    data_dir = base / "data"
    data_dir.mkdir(exist_ok=True)