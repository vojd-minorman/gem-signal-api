import { Request, Response } from 'express';
import { validateOrReject } from 'class-validator';
import { MessageRequest } from '../types/messageRequest';
import { escapeInput } from '../utils/escapeInput';
import { exec } from 'child_process';

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body; // Ne prendre que le message, les numéros sont gérés côté API

  // Validation des données entrantes
  const messageRequest = new MessageRequest();
  messageRequest.message = message;

  try {
    await validateOrReject(messageRequest);
  } catch (errors) {
    res.status(400).json({ error: 'Invalid input', details: errors });
    return; // Important pour sortir de la fonction après avoir répondu
  }

  // Transformer le message en chaîne sécurisée
  const escapedMessage = escapeInput(message);

  // Définir le numéro de téléphone source et destination dans l'API
  const phoneNumber = '243819875159'; // Exemple de numéro source
  const destinationPhoneNumber = '243853942026'; // Exemple de numéro de destination

  // Construire la commande
  const command = `wsl signal-cli -u +${phoneNumber} send +${destinationPhoneNumber} -m "${escapedMessage}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Exec error:', error.message);
      res.status(500).json({ error: `Exec error: ${error.message}` });
      return;
    }
    if (stderr) {
      console.error('Stderr:', stderr);
      res.status(500).json({ error: `stderr: ${stderr}` });
      return;
    }
    console.log('Command output:', stdout);
    res.status(200).json({ message: 'Message sent', data: stdout });
  });
};
