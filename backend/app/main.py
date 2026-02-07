from fastapi import FastAPI
from .shop import router as shop_router

app = FastAPI()

app.include_router(shop_router, prefix="/api")