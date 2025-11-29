import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null
});

const worker = new Worker('reportQueue', async job => {
  console.log(`[REPORT] Processando job ${job.id}`);
  console.log('[REPORT] Dados:', job.data);
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  return { status: 'completed', result: 'Relatório gerado com sucesso' };
}, { connection });

console.log('Worker de relatórios iniciado');