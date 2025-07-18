from fastapi import APIRouter

from app.api.v1 import search, summarize, health

v1Router = APIRouter()

v1Router.include_router(health.router, tags=["health"])
v1Router.include_router(search.router, tags=["v1"])
v1Router.include_router(summarize.router, tags=["v1"])
