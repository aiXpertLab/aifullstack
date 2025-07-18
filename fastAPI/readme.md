cd fastAPI
uvicorn main:app --reload --port 8000
uvicorn app:app --workers 4 --host 0.0.0.0 --port 8000