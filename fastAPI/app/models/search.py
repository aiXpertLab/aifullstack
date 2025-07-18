from pydantic import BaseModel
from typing import List, Optional, Any, Dict

class SearchRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5

class SearchResult(BaseModel):
    article_ids: List[str]
    scores: List[float]
    embeddings: List[List[float]]
    metadatas: List[Dict[str, Any]] 