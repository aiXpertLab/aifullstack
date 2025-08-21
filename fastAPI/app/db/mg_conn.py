import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI= os.getenv("MONGO_URI")

client = AsyncIOMotorClient(MONGO_URI)
db     = client.db_statement

bank_statement_collection  =  db.bank_statement

