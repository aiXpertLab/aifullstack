from sentence_transformers import SentenceTransformer
from typing import List

_model = None

def load_model(model_name: str = 'all-MiniLM-L6-v2'):
    global _model
    if _model is None:
        _model = SentenceTransformer(model_name)
    return _model

def embed_text(texts: List[str]) -> List[List[float]]:
    model = load_model()
    return model.encode(texts, convert_to_numpy=True).tolist() 