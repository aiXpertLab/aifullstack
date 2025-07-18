import chromadb
import os
from typing import List, Dict, Any

_client = None
_collection = None

PERSIST_DIRECTORY = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../chroma_db'))
COLLECTION_NAME = "articles"

def get_chroma_client():
    global _client
    print("ChromaDB persist directory:", PERSIST_DIRECTORY)
    if _client is None:
        _client = chromadb.PersistentClient(path=PERSIST_DIRECTORY)
    return _client

def get_or_create_collection():
    global _collection
    client = get_chroma_client()
    if _collection is None:
        _collection = client.get_or_create_collection(COLLECTION_NAME)
    return _collection

def add_documents(ids: List[str], embeddings: List[List[float]], metadatas: List[Dict[str, Any]]):
    collection = get_or_create_collection()
    collection.add(ids=ids, embeddings=embeddings, metadatas=metadatas)

def query_similar(embedding: List[float], top_k: int = 5):
    collection = get_or_create_collection()
    results = collection.query(query_embeddings=[embedding], n_results=top_k, include=["embeddings", "metadatas", "distances"])
    return results 