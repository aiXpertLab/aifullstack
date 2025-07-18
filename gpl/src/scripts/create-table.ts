import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const params = {
    TableName: "Items",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

async function createTable() {
    try {
        const data = await client.send(new CreateTableCommand(params));
        console.log("Created table. Table description:", data);
    } catch (err) {
        console.error("Unable to create table. Error:", err);
    }
}

createTable();