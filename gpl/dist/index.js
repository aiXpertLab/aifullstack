"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express = __toESM(require("express"));
var import_express_graphql = require("express-graphql");
var import_graphql = require("graphql");
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_lib_dynamodb = require("@aws-sdk/lib-dynamodb");
var client = new import_client_dynamodb.DynamoDBClient({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});
var dynamodb = import_lib_dynamodb.DynamoDBDocumentClient.from(client);
var schema = (0, import_graphql.buildSchema)(`
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
var root = {
  getItem: async ({ id }) => {
    const params = {
      TableName: "Items",
      Key: { id }
    };
    const result = await dynamodb.send(new import_lib_dynamodb.GetCommand(params));
    return result.Item;
  },
  putItem: async ({ id, name }) => {
    const params = {
      TableName: "Items",
      Item: { id, name }
    };
    await dynamodb.send(new import_lib_dynamodb.PutCommand(params));
    return { id, name };
  }
};
var app = (0, import_express.default)();
app.use("/graphql", (0, import_express_graphql.graphqlHTTP)({
  schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4e3, () => {
  console.log("Running on http://localhost:4000/graphql");
});
