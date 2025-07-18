from fastapi import APIRouter
from app.models.summarize import SummarizeRequest
from app.services.summarizer import summarize_text

router = APIRouter()

@router.post("/summarize")
def summarize_article(request: SummarizeRequest):
    return summarize_text(request) 