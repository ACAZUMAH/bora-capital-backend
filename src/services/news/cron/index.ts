import logger from 'src/loggers/logger';
import axios from 'axios';
import { MarketNewsModel } from 'src/models/news';

export const fetchAndStoreMarketNews = async () => {
  try {
    const { data } = await axios.get(`${process.env.MARKET_NEWS_API_URL}`, {
      params: {
        apiKey: process.env.MARKET_NEWS_API_KEY,
        category: 'business',
        country: 'gh',
        language: 'en',
      },
    });

    for (const article of data.articles) {
      const existingNews = await MarketNewsModel.findOne({ url: article.url });
      if (!existingNews) {
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
      }
    }
  } catch (error) {
    logger.error('Error fetching or storing market news:', error);
  }
};
