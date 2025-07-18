from fastapi import APIRouter, HTTPException
from app.models.search import SearchRequest, SearchResult
from app.services.embedding import embed_text
from app.vector.chroma_utils import query_similar
import numpy as np

router = APIRouter()

@router.post("/search", response_model=SearchResult)
def search_articles(request: SearchRequest):
    embedding = embed_text([request.query])[0]
    results = query_similar(embedding, top_k=request.top_k or 10)
    print(results)
    if results is None:
        print("ChromaDB query returned None!")
        raise HTTPException(status_code=500, detail="ChromaDB query failed")
    ids = (results.get("ids") or [[]])[0]
    scores = (results.get("distances") or [[]])[0]
    embeddings = (results.get("embeddings") or [[]])[0]
    metadatas = (results.get("metadatas") or [[]])[0]
    if (
        ids is None or len(ids) == 0 or
        scores is None or len(scores) == 0 or
        embeddings is None or len(embeddings) == 0 or
        metadatas is None or len(metadatas) == 0
    ):
        print(f"ChromaDB returned incomplete results: {results}")
        raise HTTPException(status_code=500, detail="ChromaDB returned incomplete results")
    return SearchResult(
        article_ids=list(ids),
        scores=list(scores),
        embeddings=[list(e) for e in embeddings],  # Convert each embedding to a list
        metadatas=[dict(m) for m in metadatas],    # Convert each metadata to a dict (if needed)
    ) 