import os
import fitz  # PyMuPDF
from fastapi import APIRouter, HTTPException
from datetime import datetime

from app.models.m_bank_statement import BankStatementCreate
from app.db.mg_conn import bank_statement_collection

router = APIRouter()
PDF_DIR = "./data/bs"  # folder with all PDFs

def extract_text_from_pdf(path: str) -> tuple[str, int]:
    doc = fitz.open(path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text, len(doc)

@router.post("/import_bank_statements")
async def import_bank_statements():
    """Import all PDFs in ./data/bs into MongoDB"""
    if not os.path.exists(PDF_DIR):
        raise HTTPException(status_code=400, detail="PDF folder not found")

    files = [f for f in os.listdir(PDF_DIR) if f.endswith(".pdf")]
    if not files:
        raise HTTPException(status_code=404, detail="No PDF files found in ./data/bs")

    inserted = []
    for filename in files:
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



# import os
# import fitz  # PyMuPDF
# from fastapi import APIRouter, HTTPException
# from datetime import datetime

# from app.models.m_bank_statement import BankStatementCreate
# from app.db.mg_conn import bank_statement_collection

# router = APIRouter()
# PDF_DIR = "./data/bs"

# def extract_text_from_pdf(path: str) -> tuple[str, int]:
#     doc = fitz.open(path)
#     text = ""
#     for page in doc:
#         text += page.get_text()
#     return text, len(doc)

# @router.post("/import_bank_statements")
# async def import_bank_statements():
#     """Import all PDFs in ./bs into MongoDB"""
#     if not os.path.exists(PDF_DIR):
#         raise HTTPException(status_code=400, detail="PDF folder not found")

#     files = [f for f in os.listdir(PDF_DIR) if f.endswith(".pdf")]
#     if not files:
#         raise HTTPException(status_code=404, detail="No PDF files found in ./bs")

#     inserted = []
#     for filename in files:
#         path = os.path.join(PDF_DIR, filename)

#         # ✅ check if already imported (avoid duplicates)
#         existing = await bank_statement_collection.find_one({"title": filename})
#         if existing:
#             continue

#         content, page_count = extract_text_from_pdf(path)

#         doc = BankStatementCreate(
#             title=filename,
#             uploaded_at=datetime.utcnow(),
#             content=content,
#             page_count=page_count,
#             status="pending"
#         ).dict()

#         result = await bank_statement_collection.insert_one(doc)
#         inserted.append({"title": filename, "id": str(result.inserted_id)})

#     return {"imported": inserted, "count": len(inserted)}
