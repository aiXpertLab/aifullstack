import yahooFinance from 'yahoo-finance2';

export function createStockResolver() {
  return {
    Subscription: {
      stockPrice: {
        subscribe: async function* (_, { symbol }) {
          while (true) {
            try {
              const quote = await yahooFinance.quote(symbol);
              yield {
                stockPrice: {
                  symbol: quote.symbol,
                  price: quote.regularMarketPrice,
                  change: quote.regularMarketChange,
                  changePercent: quote.regularMarketChangePercent,
                  timestamp: new Date().toISOString()
                }
              };
            } catch (error) {
              console.error('Error fetching stock price:', error);
            }
            
            // Wait 5 seconds before next update
            await new Promise(resolve => setTimeout(resolve, 5000));
          }
        }
      }
    }
  };
}
