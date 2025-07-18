import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { dynamodb } from "@/db/dynamodbClient";

// Example articles array (replace with your real data as needed)
const articles = Array.from({ length: 10 }).map((_, i) => ({
    id: `${i + 1}`,
    title: `Sample Article ${i + 1}`,
    summary: `This is a summary for article ${i + 1}. It provides a brief overview of the article content.`,
    content: `This is the full content of article ${i + 1}. Here you can write detailed information, analysis, and insights for the article.`,
    coverImage: `https://picsum.photos/id/10${i + 1}/600/300`,
    date: new Date(Date.now() - i * 86400000).toISOString(),
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 500),
    comments: Math.floor(Math.random() * 100),
    shares: Math.floor(Math.random() * 50),
}));

async function seed() {
    // DynamoDB batch write supports up to 25 items per request
    const BATCH_SIZE = 25;
    for (let i = 0; i < articles.length; i += BATCH_SIZE) {
        const batch = articles.slice(i, i + BATCH_SIZE);
        const params = {
            RequestItems: {
                Articles: batch.map(item => ({
                    PutRequest: { Item: item }
                }))
            }
        };
        await dynamodb.send(new BatchWriteCommand(params));
    }
    console.log(`Seeded ${articles.length} articles to DynamoDB!`);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});