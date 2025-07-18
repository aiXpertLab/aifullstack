from transformers.pipelines import pipeline
from app.models.summarize import SummarizeRequest

def chunk_text(text, chunk_size=1024):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

def summarize_text(request: SummarizeRequest):
    print(f"[Summarize] Start: {request.text[:40]}...")
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    chunk_size = 1024
    chunks = chunk_text(request.text, chunk_size)
    summaries = []
    for chunk in chunks:
        summary = summarizer(
            chunk,
            max_length=request.max_length,
            min_length=request.min_length,
            do_sample=False
        )
        summaries.append(summary[0]["summary_text"])
    combined_summary = " ".join(summaries)
    combined_summary = summarizer(combined_summary, max_length=request.max_length, min_length=request.min_length, do_sample=False)
    print(f"[Summarize] Done: {request.text[:40]}...")
    return {"summary": combined_summary} 