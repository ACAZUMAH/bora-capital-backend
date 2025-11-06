import { CronJob } from 'cron';
import { CronConfig } from 'src/common/interfaces';
import logger from 'src/loggers/logger';

const cronConfigs: CronConfig[] = [];

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
