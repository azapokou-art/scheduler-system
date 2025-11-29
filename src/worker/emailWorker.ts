import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { logger } from '../shared/logger';

const connection = new IORedis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null
});

const worker = new Worker('emailQueue', async job => {
  logger.info('Iniciando processamento de job', { 
    jobId: job.id, 
    queue: 'emailQueue',
    data: job.data 
  });
  
  try {
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    logger.info('Job processado com sucesso', { 
      jobId: job.id,
      duration: '5s'
    });
    
    return { status: 'completed', result: 'Email enviado com sucesso' };
  } catch (error) {
    logger.error('Erro ao processar job', { 
      jobId: job.id,
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    });
    throw error;
  }
}, { connection });

logger.info('Worker de email iniciado');