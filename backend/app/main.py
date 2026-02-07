from fastapi import FastAPI
from .shop import router as shop_router

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(shop_router, prefix="/api")