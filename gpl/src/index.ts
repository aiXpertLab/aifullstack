import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";
import { createItemResolver } from "./resolvers/itemResolver";
import { dynamodb } from "./db/dynamodbClient";

const root = createItemResolver(dynamodb);

const app = express();
app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Running on http://localhost:4000/graphql");
});