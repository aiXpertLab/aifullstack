import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

// Configure DynamoDB Local
const client = new DynamoDBClient({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
const dynamodb = DynamoDBDocumentClient.from(client);

// GraphQL schema
const schema = buildSchema(`
  type Item {
    id: ID!
    name: String!
  }
  type Query {
    getItem(id: ID!): Item
  }
  type Mutation {
    putItem(id: ID!, name: String!): Item
  }
`);

// Resolvers
const root = {
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

const app = express();
app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Running on http://localhost:4000/graphql");
});