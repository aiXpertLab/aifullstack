import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const itemsParams = {
    TableName: "Items",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" as const }],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" as const }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

const articlesParams = {
    TableName: "Articles",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" as const }],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" as const }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

async function createTable(params: any) {
    try {
        const data = await client.send(new CreateTableCommand(params));
        console.log(`Created table ${params.TableName}. Table description:`, data);
    } catch (err: any) {
        if (err.name === "ResourceInUseException") {
            console.log(`Table ${params.TableName} already exists.`);
        } else {
            console.error(`Unable to create table ${params.TableName}. Error:`, err);
        }
    }
}

async function main() {
    await createTable(itemsParams);
    await createTable(articlesParams);
}

main();