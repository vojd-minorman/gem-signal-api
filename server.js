const express = require('express');
const cors = require('cors'); // Importer le module cors
const { exec } = require('child_process');
const app = express();
const port = 3000;

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Activer CORS pour toutes les origines
app.use(cors());

app.post('/send-message', (req, res) => {
    console.log('Request body:', req.body); // Log pour vérifier le corps de la requête
    const { phoneNumber, message, destinationPhoneNumber } = req.body;

    if (!phoneNumber || !message || !destinationPhoneNumber) {
        console.log('Missing parameters in request body'); // Log en cas d'erreur
        return res.status(400).json({ error: 'Phone number, message, and destination phone number are required' });
    }

    const command = `wsl signal-cli -u +${phoneNumber} send +${destinationPhoneNumber} -m "${message}"`;
    console.log('Executing command:', command); // Log pour vérifier la commande exécutée

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Exec error:', error.message); // Log d'erreur
            return res.status(500).json({ error: `Exec error: ${error.message}` });
        }
        if (stderr) {
            console.error('Stderr:', stderr); // Log pour stderr
            return res.status(500).json({ error: `stderr: ${stderr}` });
        }
        console.log('Command output:', stdout); // Log pour la sortie
        return res.status(200).json({ message: 'Message sent', data: stdout });
    });
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
