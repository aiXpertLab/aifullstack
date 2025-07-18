const Parser = require('rss-parser');
const fetch = require('node-fetch');
const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');

const dynamoClient = new DynamoDBClient({
  region: "us-west-2",
  endpoint: "http://localhost:8000" // Change/remove for AWS cloud
});
const dynamodb = DynamoDBDocumentClient.from(dynamoClient);

const rssFeeds = [
  'https://finance.yahoo.com/news/rssindex',
  'http://feeds.reuters.com/reuters/businessNews',
  'https://www.cnbc.com/id/100003114/device/rss/rss.html',
  'https://feeds.marketwatch.com/marketwatch/topstories/',
  'https://www.ft.com/?format=rss',
  'https://www.bloomberg.com/feed/podcast/etf-report.xml',
  'https://feeds.a.dj.com/rss/RSSMarketsMain.xml'
];

const unsplashImages = [
  'https://ichef.bbci.co.uk/news/1024/cpsprodpb/b491/live/e1dd7370-13cf-11f0-bf82-cb6aee90e3a2.jpg.webp',
];

async function fetchArticlesFromRSS() {
  const parser = new Parser();
  let articles = [];
  for (const feed of rssFeeds) {
    try {
      const parsed = await parser.parseURL(feed);
      articles = articles.concat(parsed.items);
    } catch (e) {
      console.error('Failed to fetch RSS feed:', feed, e);
    }
  }
  return articles;
}

async function fetchFullContent(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    const html = await res.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    return article && article.textContent ? article.textContent : '';
  } catch (e) {
    return '';
  }
}

async function fetchPageImage(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    const html = await res.text();
    const dom = new JSDOM(html);
    // Try og:image
    const ogImage = dom.window.document.querySelector('meta[property="og:image"]');
    if (ogImage && ogImage.content && ogImage.content.startsWith('http')) {
      return ogImage.content;
    }
    // Try first <img> in article
    const articleImg = dom.window.document.querySelector('article img');
    if (articleImg && articleImg.src && articleImg.src.startsWith('http')) {
      return articleImg.src;
    }
    // Try any <img> on the page
    const anyImg = dom.window.document.querySelector('img');
    if (anyImg && anyImg.src && anyImg.src.startsWith('http')) {
      return anyImg.src;
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function buildArticleDocs(rawArticles) {
  const docs = [];
  function isAdImage(url) {
    if (!url) return true;
    const adDomains = ['doubleclick', 'googlesyndication', 'adservice', 'adnxs', 'adsystem', 'adroll', 'taboola', 'outbrain'];
    return adDomains.some(domain => url.includes(domain));
  }
  for (let i = 0; i < rawArticles.length && docs.length < 50; i++) {
    const a = rawArticles[i];
    if (!a.title || !a.link) continue;
    let coverImage = null;
    if (a.enclosure && a.enclosure.url && !isAdImage(a.enclosure.url)) {
      coverImage = a.enclosure.url;
    } else if (a['media:content'] && a['media:content']['$'] && a['media:content']['$'].url && !isAdImage(a['media:content']['$'].url)) {
      coverImage = a['media:content']['$'].url;
    } else if (a['media:thumbnail'] && a['media:thumbnail']['$'] && a['media:thumbnail']['$'].url && !isAdImage(a['media:thumbnail']['$'].url)) {
      coverImage = a['media:thumbnail']['$'].url;
    } else if (a.image && typeof a.image === 'string' && !isAdImage(a.image)) {
      coverImage = a.image;
    }
    if (!coverImage) {
      coverImage = await fetchPageImage(a.link);
    }
    if (!coverImage) {
      coverImage = unsplashImages[Math.floor(Math.random() * unsplashImages.length)];
    }
    let content = a.content || a['content:encoded'] || a.summary || '';
    if (!content || content.length < 200) {
      content = await fetchFullContent(a.link);
    }
    if (!content || content.length < 200) continue;
    docs.push({
      id: a.guid || a.link || a.title, // DynamoDB PK
      title: a.title,
      summary: a.contentSnippet || a.summary || a.title,
      content,
      coverImage,
      date: a.isoDate ? new Date(a.isoDate).toISOString() : new Date().toISOString(),
      views: Math.floor(Math.random() * 10000),
      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 50),
    });
  }
  return docs;
}

async function seed() {
  const rawArticles = await fetchArticlesFromRSS();
  const articles = await buildArticleDocs(rawArticles);

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
  }
  console.log(`Seeded ${articles.length} real finance articles to DynamoDB!`);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
}); 