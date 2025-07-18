from transformers import pipeline
from app.models.summarize import SummarizeRequest

def summarize_text(request: SummarizeRequest):
    print(f"[Summarize] Start: {request.text[:40]}...")
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    max_input_length = 1024
    input_text = request.text[:max_input_length]
    summary = summarizer(input_text, max_length=request.max_length, min_length=request.min_length, do_sample=False)
    print(f"[Summarize] Done: {request.text[:40]}...")
    return {"summary": summary[0]["summary_text"]} 