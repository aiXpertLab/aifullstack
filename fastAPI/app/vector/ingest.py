import boto3
from embed import embed_text
from chroma_utils import add_documents

def fetch_all_articles_from_dynamo(region="us-west-2", endpoint="http://localhost:8000", table_name="Articles"):
    """
    Fetch all articles from the DynamoDB 'Articles' table.
    Handles pagination if there are more than 1MB of items.
    """
    dynamodb = boto3.resource('dynamodb', region_name=region, endpoint_url=endpoint)
    table = dynamodb.Table(table_name)  # type: ignore[attr-defined]
    articles = []
    response = table.scan()
    articles.extend(response.get('Items', []))
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        articles.extend(response.get('Items', []))
    return articles

def main():
    print("Fetching articles from DynamoDB...")
    articles = fetch_all_articles_from_dynamo()
    print(f"Fetched {len(articles)} articles.")

    texts = [a.get("content", "") for a in articles]
    ids = [a.get("id", "") for a in articles]
    metadatas = [{"title": a.get("title", ""), "id": a.get("id", "")} for a in articles]

    print(f"Embedding {len(texts)} articles...")
    embeddings = embed_text(texts)

    print("Storing embeddings in ChromaDB...")
    add_documents(ids, embeddings, metadatas)
    print("Done.")

if __name__ == "__main__":
    main() 