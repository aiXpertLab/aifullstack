npm init -y


docker run -d -p 8000:8000 --name dynamodb-local amazon/dynamodb-local



docker run -p 8001:8001 --env DYNAMO_ENDPOINT=http://host.docker.internal:8000 --env AWS_REGION=us-west-2 --env AWS_ACCESS_KEY_ID=local --env AWS_SECRET_ACCESS_KEY=local aaronshaf/dynamodb-admin


aws dynamodb list-tables --endpoint-url http://localhost:8000

npx ts-node src/create-table.ts