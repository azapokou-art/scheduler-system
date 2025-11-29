# Sistema de Agendamento Assíncrono

Sistema completo de agendamento de jobs com filas distribuídas.

##  Funcionalidades

- Agendamento de jobs únicos e recorrentes
- Múltiplas filas especializadas (email, relatórios)
- Dashboard para monitoramento (BullBoard)
- Logs estruturados
- Escalabilidade com workers independentes

##  Endpoints

### Criar job de email
```bash
POST /jobs
{
  "to": "email@test.com",
  "subject": "Assunto",
  "body": "Conteúdo"
}

Criar job recorrente:

POST /jobs/recurrent
{
  "to": "email@test.com",
  "subject": "Diário",
  "body": "Conteúdo",
  "cronPattern": "0 9 * * *"
}

Criar job de relatório:

POST /jobs/report
{
  "type": "sales",
  "dateRange": "2024-01-01 to 2024-12-31",
  "format": "pdf"
}

Consultar status:
GET /jobs/:id

Como executar

Subir Redis:
npm run docker:up

Iniciar API:
npm run dev

Iniciar Workers:
node dist/worker/emailWorker.js
node dist/worker/reportWorker.js

Dashboard:
npm run dashboard

Dashboard
Acesse: http://localhost:3001/admin/queues