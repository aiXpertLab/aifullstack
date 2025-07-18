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
        semanticSearch(query: String!, topK: Int): [Article!]!
    }

    type Mutation {
        putItem(id: ID!, name: String!): Item
        
        createArticle(
            title: String!
            summary: String!
            content: String!
            coverImage: String
            date: String
            views: Int
            likes: Int
            comments: Int
            shares: Int
            ): Article!
    }

      type StockPrice {
        symbol: String!
        price: Float!
        change: Float!
        changePercent: Float!
        timestamp: String!
    }


    type Subscription {
        articleCreated: ArticleResult!
        stockPrice(symbol: String!): StockPrice!
    }

  type ArticleResult {
    id: ID!
    title: String!
    summary: String
    content: String
    coverImage: String
    date: String
    views: Int
    likes: Int
    comments: Int
    shares: Int
    score: Float
    embedding: [Float]
    metadata: String
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




