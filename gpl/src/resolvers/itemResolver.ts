import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, BatchGetCommand } from "@aws-sdk/lib-dynamodb";
import axios from "axios";

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


export function createArticleResolver(dynamodb: DynamoDBDocumentClient) {
    return {
      Query: {
        getArticle: async (_: any, { id }: { id: string }) => {
          const params = { TableName: "Articles", Key: { id } };
          const result = await dynamodb.send(new GetCommand(params));
          return result.Item;
        },
        listArticles: async () => {
          const params = { TableName: "Articles" };
          const result = await dynamodb.send(new ScanCommand(params));
          return result.Items || [];
        },


        semanticSearch: async (_: any, { query, topK }: { query: string, topK?: number }) => {
            // Call FastAPI
            const response = await axios.post('http://localhost:8080/v1/search', {
                query,
                top_k: topK || 5,
            });
            const { article_ids, scores, embeddings, metadatas } = response.data;

            // Batch get articles from DynamoDB
            const batchGetParams = {
              RequestItems: {
                Articles: {
                  Keys: article_ids.map((id: string) => ({ id })),
                },
              },
            };
            const batchResult = await dynamodb.send(new BatchGetCommand(batchGetParams));
            const articles = batchResult.Responses?.Articles || [];

            // Map articles to the order of article_ids and attach scores, embeddings, metadatas
            const idToArticle = Object.fromEntries(articles.map((a: any) => [a.id, a]));
            const idToScore = Object.fromEntries(article_ids.map((id: string, i: number) => [id, scores[i]]));
            const idToEmbedding = Object.fromEntries(article_ids.map((id: string, i: number) => [id, embeddings[i]]));
            const idToMetadata = Object.fromEntries(article_ids.map((id: string, i: number) => [id, metadatas[i]]));

            return article_ids.map((id: string) => {
                const a = idToArticle[id];
                if (!a) return null;
                return {
                    id: a.id,
                    title: a.title,
                    summary: a.summary,
                    content: a.content,
                    coverImage: a.coverImage,
                    date: a.date,
                    views: a.views,
                    likes: a.likes,
                    comments: a.comments,
                    shares: a.shares,
                    score: idToScore[id],
                    embedding: idToEmbedding[id],
                    metadata: idToMetadata[id],
                };
            }).filter(Boolean);
        },
      }
    };
  }