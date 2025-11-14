import { CronJob } from 'cron';
import { CronConfig } from 'src/common/interfaces';
import logger from 'src/loggers/logger';
import { fetchAndStoreMarketNews } from 'src/services/news/cron';

const cronConfigs: CronConfig[] = [
  {
    name: 'Fetch Market News',
    schedule: '0 */2 * * *', // Every 2 hours
    Job: async () => {
      fetchAndStoreMarketNews();
    },
  },
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
