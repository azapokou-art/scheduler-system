import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null
});

const worker = new Worker('emailQueue', async job => {
  console.log(`Processando job ${job.id}`);
  console.log('Dados:', job.data);
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  return { status: 'completed', result: 'Email enviado com sucesso' };
}, { connection });

console.log('Worker de email iniciado');