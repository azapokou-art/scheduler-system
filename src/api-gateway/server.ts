import express from 'express';
import { jobQueue } from '../shared/queue';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/jobs', async (req, res) => {
  try {
    const job = await jobQueue.add('send-email', {
      to: req.body.to,
      subject: req.body.subject,
      body: req.body.body
    });

    res.json({
      jobId: job.id,
      status: 'agendado',
      message: 'Job criado com sucesso'
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar job' });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
});