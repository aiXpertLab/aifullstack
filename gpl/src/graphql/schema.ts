export const typeDefs = `#graphql
    type Item {
        id: ID!
        name: String!
    }


    type Article {
        id: ID!
        title: String!
        summary: String!
        content: String!
        coverImage: String!
        date: String!
        views: Int!
        likes: Int!
        comments: Int!
        shares: Int!
        score: Float
        embedding: [Float]
    }


    type Query {
        getArticle(id: ID!): Article
        listArticles: [Article!]!
    }

    type Mutation {
        putItem(id: ID!, name: String!): Item
    }
`;

// import { buildSchema } from "graphql";

// export const schema = buildSchema(`
//   type Item {
//     id: ID!
//     name: String!
//   }
//   type Query {
//     getItem(id: ID!): Item
//   }
//   type Mutation {
//     putItem(id: ID!, name: String!): Item
//   }
// `); 


  
  
  