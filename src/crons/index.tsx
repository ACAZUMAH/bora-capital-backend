import { CronJob } from 'cron';
import { CronConfig } from 'src/common/interfaces';
import logger from 'src/loggers/logger';
import { clearMarketNews, fetchAndStoreMarketNews } from 'src/services/insights-news/cron';

const cronConfigs: CronConfig[] = [
  {
    name: 'Fetch Market News',
    schedule: "0 */1 * * *", // Every hour at minute 0
    runOnInit: true,
    Job: async () => {
      fetchAndStoreMarketNews();
    },
  },
  {
    name: 'Clear Market News',
    schedule: "0 0 * * 0", // Every Sunday at midnight
    runOnInit: false,
    Job: async () => {
      clearMarketNews();
    },
  }
];

export const applyCrons = () => {
  cronConfigs.map(config => {
    logger.info(`[CRON] Starting ${config.name}`);

    const job = new CronJob(
      config.schedule,
      async () => {
        try {
          await config.Job();
          logger.info(`[CRON] completed ${config.name}`);
        } catch (error) {
          logger.error(`[CRON] failed ${config.name}:`, { error });
        }
      },
      null,
      true,
      'UTC',
      undefined,
      config.runOnInit
    );

    job.start();
  });
};
