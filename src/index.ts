import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'express';
import { sendMessage } from './controllers/messageController';

const app: Application = express();
const port: number = 3000;

// Middleware de sécurité
app.use(helmet());

// Activer CORS avec des configurations sécurisées
app.use(
  cors({
    origin: 'http://localhost:4000',
    methods: ['POST'],
  })
);

// Middleware pour gérer les requêtes JSON
app.use(json());

// Route principale
try {
  app.post('/send-message', sendMessage);
} catch (error) {
  console.error('Error initializing route:', error);
}

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
