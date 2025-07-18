from pydantic import BaseModel

class SummarizeRequest(BaseModel):
    text: str
    max_length: int = 60
    min_length: int = 20 