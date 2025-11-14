import logger from 'src/loggers/logger';
import axios from 'axios';
import { MarketNewsModel } from 'src/models/news';
import { looker } from 'googleapis/build/src/apis/looker';

export const fetchAndStoreMarketNews = async () => {
  try {
    const { data } = await axios.get(`${process.env.MARKET_NEWS_API_URL}`, {
      params: {
        apiKey: process.env.MARKET_NEWS_API_KEY,
        category: 'business',
        // country: 'gh',
        language: 'en',
      },
    });

    for (const article of data.articles) {
      const existingNews = await MarketNewsModel.findOne({ url: article.url });
      if (!existingNews) {
        logger.info(`Storing news article: ${article.title}`);
        await MarketNewsModel.create({
          title: article.title,
          source: article.source.name,
          url: article.url,
          summary: article.description,
          content: article.content,
          author: article.author || 'Unknown',
          publishedAt: article.publishedAt,
          tag: ['business', 'market'],
        });
        logger.info(`Stored news article: ${article.title}`);
      }
    }
    logger.info('Market news fetching and storing completed.');
  } catch (error) {
    logger.error('Error fetching or storing market news:', error);
  }
};
