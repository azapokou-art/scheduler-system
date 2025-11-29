import express from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { jobQueue } from '../shared/queue';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(jobQueue)],
  serverAdapter: serverAdapter,
});

const app = express();
app.use('/admin/queues', serverAdapter.getRouter());

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Dashboard rodando na porta ${PORT}`);
});