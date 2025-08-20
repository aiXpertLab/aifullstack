npm init -y


docker run -d -p 8000:8000 --name dynamodb-local amazon/dynamodb-local

<!-- docker run -d -p 8000:8000 --name dynamodb-local -v A:/aifullstack/dynamo_data:/home/dynamodblocal/data amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath /home/dynamodblocal/data -->
docker run -d -p 8000:8000 --name dynamodb-local -v D:/aifullstack/dynamo_data:/home/dynamodblocal/data amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath /home/dynamodblocal/data

docker run -d -p 8000:8000 --name dynamodb-local `
  -v C:/dynamodb-data:/home/dynamodblocal/data `
  amazon/dynamodb-local `
  -jar DynamoDBLocal.jar -sharedDb -dbPath /home/dynamodblocal/data

docker run -d -p 8000:8000 --name dynamodb-local -v C:/dynamodb-data:/home/dynamodblocal/data amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath /home/dynamodblocal/data

docker run -p 8001:8001 --env DYNAMO_ENDPOINT=http://host.docker.internal:8000 --env AWS_REGION=us-west-2 --env AWS_ACCESS_KEY_ID=local --env AWS_SECRET_ACCESS_KEY=local aaronshaf/dynamodb-admin


aws dynamodb list-tables --endpoint-url http://localhost:8000

npx ts-node src/create-table.ts
npx ts-node -r tsconfig-paths/register seed_articles_dynamodb.ts





















1. Data Layer

Raw Data: 100 PDFs (bank statements).

Preprocessing:

Convert PDFs → text (one time ingestion).

Chunk each statement into smaller passages (e.g. 500 tokens).

Store metadata (statement_id, page, etc.).

Storage:

DynamoDB: stores metadata and raw extracted text.

ChromaDB: stores vector embeddings of chunks for semantic search.

2. Backend Layer

You have two services:

Express + Apollo (GraphQL gateway)

Acts as the API layer your React frontend talks to.

Provides queries like:

listStatements(limit, offset) → paginated list of bank statements (title, contents).

searchStatements(query) → semantic search results (from Chroma).

summarizeStatement(id) → request summarization.

Delegates work to FastAPI where heavy AI/ML tasks run.

FastAPI (AI service)

Handles AI-related operations:

Summarization of a statement (calls LLM).

Embedding generation for Chroma.

Exposes REST endpoints that Apollo can call, e.g.:

POST /summarize

POST /embed

3. AI + Semantic Search

Embeddings:

When PDFs are ingested → FastAPI generates embeddings (via OpenAI/other model).

Store embeddings in Chroma with metadata (statement_id, chunk index).

Semantic Search flow:

User enters query in React.

Apollo → calls FastAPI or directly queries Chroma.

Chroma returns relevant chunks.

Apollo resolves to a GraphQL response with search results.

Summarization flow:

User clicks “Summarize” button for a post.

Apollo → calls FastAPI /summarize?id=....

FastAPI fetches text from DynamoDB, runs LLM summarization.

Returns summary to Apollo → React updates UI.

4. Frontend (React)

Page structure:

Top: search box (semantic search).

List view: 100 bank statements shown like blog posts (title, preview).

Each item:

Show title + first lines of content.

Button → “Summarize”.

On click → calls GraphQL mutation → fetches summary → renders below the post.

GraphQL Queries/Mutations:

query GetStatements($limit: Int, $offset: Int) {
  listStatements(limit: $limit, offset: $offset) {
    id
    title
    contentPreview
  }
}

mutation Summarize($id: ID!) {
  summarizeStatement(id: $id) {
    id
    summary
  }
}

query Search($query: String!) {
  searchStatements(query: $query) {
    id
    snippet
    score
  }
}

5. High-Level Architecture Diagram (conceptual)
[ React UI ]
    |
    v
[ Apollo GraphQL (Express) ]
    |--- listStatements --> [ DynamoDB ]
    |--- searchStatements -> [ ChromaDB ]
    |--- summarizeStatement -> [ FastAPI ]
                                      |
                                      +--> LLM (summarize)
                                      +--> Embeddings (for Chroma)

6. Development Flow

Preprocessing pipeline (one-time or batch):

Parse PDFs → store in Dynamo → embed in Chroma.

Backend services:

Apollo = frontend gateway.

FastAPI = AI engine.

Frontend:

React app with list + summarize button + search bar.