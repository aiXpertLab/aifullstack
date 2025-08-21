import logging
import os
import fitz  # PyMuPDF
from fastapi import APIRouter, HTTPException
from datetime import datetime

from app.models.m_bank_statement import BankStatementCreate
from app.db.mg_conn import bank_statement_collection

router = APIRouter()
PDF_DIR = "./data/bs"  # folder with all PDFs

print("FITZ FILE:", fitz.__file__)
print("HAS open:", hasattr(fitz, "open"))

def extract_text_from_pdf(path: str) -> tuple[str, int]:
    doc = fitz.open(path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text, len(doc)

# @router.get("/bs2db")
@router.post("/import_bank_statements")
async def import_bank_statements():
    """Import all PDFs in ./data/bs into MongoDB"""
    if not os.path.exists(PDF_DIR):
        raise HTTPException(status_code=400, detail="PDF folder not found")

    files = [f for f in os.listdir(PDF_DIR) if f.endswith(".pdf")]

    logging.info(f"Found {len(files)} PDF files in {PDF_DIR}")
    
    if not files:
        raise HTTPException(status_code=404, detail="No PDF files found in ./data/bs")

    inserted = []
    for filename in files:
        logging.info(f"Processing file: {filename}")
        path = os.path.join(PDF_DIR, filename)

        # skip if already imported
        existing = await bank_statement_collection.find_one({"title": filename})
        if existing:
            continue

        content, page_count = extract_text_from_pdf(path)

        doc = BankStatementCreate(
            title=filename,
            uploaded_at=datetime.utcnow(),
            content=content,
            page_count=page_count,
            status="pending"
        ).dict()

        result = await bank_statement_collection.insert_one(doc)
        inserted.append({"title": filename, "id": str(result.inserted_id)})

    return {"imported": inserted, "count": len(inserted)}
