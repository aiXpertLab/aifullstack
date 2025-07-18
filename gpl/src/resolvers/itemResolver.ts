import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export function createItemResolver(dynamodb: DynamoDBDocumentClient) {
    return {
        getItem: async ({ id }: { id: string }) => {
            const params = {
                TableName: "Items",
                Key: { id }
            };
            const result = await dynamodb.send(new GetCommand(params));
            return result.Item;
        },
        putItem: async ({ id, name }: { id: string, name: string }) => {
            const params = {
                TableName: "Items",
                Item: { id, name }
            };
            await dynamodb.send(new PutCommand(params));
            return { id, name };
        }
    };
} 