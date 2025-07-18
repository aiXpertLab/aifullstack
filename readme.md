npm init -y


docker run -d -p 8000:8000 --name dynamodb-local amazon/dynamodb-local

docker run -d -p 8000:8000 --name dynamodb-local -v A:/aifullstack/dynamo_data:/home/dynamodblocal/data amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath /home/dynamodblocal/data

docker run -d -p 8000:8000 --name dynamodb-local `
  -v C:/dynamodb-data:/home/dynamodblocal/data `
  amazon/dynamodb-local `
  -jar DynamoDBLocal.jar -sharedDb -dbPath /home/dynamodblocal/data

docker run -d -p 8000:8000 --name dynamodb-local -v C:/dynamodb-data:/home/dynamodblocal/data amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath /home/dynamodblocal/data

docker run -p 8001:8001 --env DYNAMO_ENDPOINT=http://host.docker.internal:8000 --env AWS_REGION=us-west-2 --env AWS_ACCESS_KEY_ID=local --env AWS_SECRET_ACCESS_KEY=local aaronshaf/dynamodb-admin


aws dynamodb list-tables --endpoint-url http://localhost:8000

npx ts-node src/create-table.ts
npx ts-node -r tsconfig-paths/register seed_articles_dynamodb.ts

