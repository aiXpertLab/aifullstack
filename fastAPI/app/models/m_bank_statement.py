from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class BankStatementCreate(BaseModel):
    title: str
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    content: str
    page_count: Optional[int] = None
    summary: Optional[str] = None
    status: str = Field(default="pending")  # pending | processed | error


class BankStatement(BankStatementCreate):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}
