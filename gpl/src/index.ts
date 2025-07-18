import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./graphql/schema";
import { createItemResolver } from "./resolvers/itemResolver";
import { dynamodb } from "./db/dynamodbClient";

const resolvers = createItemResolver(dynamodb);
const schema = makeExecutableSchema({ typeDefs, resolvers });

async function startServer() {
    const app = express();
    const server = new ApolloServer({ schema });
    await server.start();
    app.use(express.json());
    app.use("/graphql", expressMiddleware(server));
    app.listen(4000, () => {
        console.log("🚀 Apollo Server (Express 5) ready at http://localhost:4000/graphql");
    });
}

startServer();


// import express from "express";
// import { graphqlHTTP } from "express-graphql";
// import { schema } from "./graphql/schema";
// import { createItemResolver } from "./resolvers/itemResolver";
// import { dynamodb } from "./db/dynamodbClient";

// const root = createItemResolver(dynamodb);

// const app = express();
// app.use("/graphql", graphqlHTTP({
//     schema,
//     rootValue: root,
//     graphiql: true
// }));

// app.listen(4000, () => {
//     console.log("Running on http://localhost:4000/graphql");
// });