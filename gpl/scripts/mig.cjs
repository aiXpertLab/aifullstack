const mongoose = require('mongoose');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');

const MONGO_URI = 'mongodb+srv://aiaccfin:fgXMg0LHwgLSpzAR@aiacccluster.gvoyp.mongodb.net/meitou?retryWrites=true&w=majority&appName=aiaccCluster';

const articleSchema = new mongoose.Schema({
  id: String, // Add this if not present in your schema
  title: String,
  summary: String,
  content: String,
  coverImage: String,
  date: Date,
  views: Number,
  likes: Number,
  comments: Number,
  shares: Number,
});

const Article = mongoose.model('Article', articleSchema);

const dynamoClient = new DynamoDBClient({
  region: "us-west-2",
  endpoint: "http://localhost:8000" // Change/remove for AWS cloud
});
const dynamodb = DynamoDBDocumentClient.from(dynamoClient);

async function migrate() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const articles = await Article.find().lean();
  console.log(`Fetched ${articles.length} articles from MongoDB`);

  // Ensure each article has a unique 'id' for DynamoDB
  articles.forEach((a, i) => {
    // Convert _id/ObjectId to string for DynamoDB 'id'
    if (!a.id) a.id = a._id ? String(a._id) : String(i + 1);

    // Remove _id field if present
    if (a._id) delete a._id;

    // Convert Date objects to ISO strings
    if (a.date && a.date.toISOString) a.date = a.date.toISOString();

    // Optionally, ensure all fields are plain JS types (string, number, boolean, array, object)
  });

  // Batch write to DynamoDB (max 25 at a time)
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
    console.log(`Wrote batch ${i / BATCH_SIZE + 1}`);
  }

  console.log(`Migrated ${articles.length} articles to DynamoDB!`);
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});