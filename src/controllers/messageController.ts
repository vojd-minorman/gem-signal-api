import { Request, Response } from 'express';
import { validateOrReject } from 'class-validator';
import { MessageRequest } from '../types/messageRequest';
import { escapeInput } from '../utils/escapeInput';
import { exec } from 'child_process';

// Liste des numéros de destinataires définis dans l'API
const destinationPhoneNumbers = [
  '243853942026', // Exemple de numéro 1
  '243906081920', // Exemple de numéro 2
  '243997300169',
  '243820076004', // Exemple de numéro 3
  // Ajoutez d'autres numéros selon vos besoins
];

// Numéro Signal défini dans l'API
const phoneNumber = '243819875159'; // Exemple de numéro source

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

  // Fonction pour envoyer un message à un destinataire
  const sendToPhoneNumber = (destinationPhoneNumber: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Construire la commande pour chaque destinataire
      const command = `wsl signal-cli -u +${phoneNumber} send +${destinationPhoneNumber} -m "${escapedMessage}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Erreur d'exécution: ${error.message}`);
        }
        if (stderr) {
          reject(`Stderr: ${stderr}`);
        }
        resolve(stdout);
      });
    });
  };

  // Envoyer le message à tous les numéros de la liste
  try {
    const sendPromises = destinationPhoneNumbers.map((destinationPhoneNumber: string) => sendToPhoneNumber(destinationPhoneNumber));
    const results = await Promise.all(sendPromises);

    // Répondre lorsque tous les messages ont été envoyés
    res.status(200).json({ message: 'Messages envoyés avec succès', data: results });
  } catch (error) {
    // Si une erreur se produit pour l'un des numéros, retourner une erreur
    console.error('Erreur lors de l\'envoi des messages:', error);
    res.status(500).json({ error: `Erreur lors de l'envoi des messages: ${error}` });
  }
};
