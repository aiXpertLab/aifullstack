from fastapi import APIRouter

from app.api.v1 import v1Router

apiRouter = APIRouter()

apiRouter.include_router(v1Router, prefix="/v1")
