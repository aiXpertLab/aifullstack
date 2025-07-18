import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export function createItemResolver(dynamodb: DynamoDBDocumentClient) {
    return {
        Query: {
            getItem: async (_: any, { id }: { id: string }) => {
                const params = { TableName: "Items", Key: { id } };
                const result = await dynamodb.send(new GetCommand(params));
                return result.Item;
            }
        },
        Mutation: {
            putItem: async (_: any, { id, name }: { id: string, name: string }) => {
                const params = { TableName: "Items", Item: { id, name } };
                await dynamodb.send(new PutCommand(params));
                return { id, name };
            }
        }
    };
} 