import AWS from "aws-sdk";

AWS.config.update({ region: "us-west-2" });
const dynamodb = new AWS.DynamoDB({ endpoint: "http://localhost:8000" });

const params = {
    TableName: "Items",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error:", err);
    } else {
        console.log("Created table. Table description:", data);
    }
});