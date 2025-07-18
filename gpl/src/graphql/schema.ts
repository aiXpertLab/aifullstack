import { buildSchema } from "graphql";

export const schema = buildSchema(`
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