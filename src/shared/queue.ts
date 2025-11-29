import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null
});

export const jobQueue = new Queue('emailQueue', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000
    }
  }
});

export const reportQueue = new Queue('reportQueue', {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: 'fixed',
      delay: 2000
    }
  }
});