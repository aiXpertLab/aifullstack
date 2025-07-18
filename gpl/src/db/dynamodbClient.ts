import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
export const dynamodb = DynamoDBDocumentClient.from(client); 