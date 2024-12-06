# API Gem

Bienvenue dans l'API **Gem**, une API qui permet l'envoi de messages via une simple requête HTTP POST. L'API est conçue pour être utilisée par d'autres applications ou interfaces souhaitant envoyer des messages.

L'API se charge de la gestion du numéro de signal, de la liste des destinataires, et d'autres configurations internes. Les applications qui consomment l'API n'ont qu'à envoyer un objet JSON contenant le champ `message`.

## Fonctionnalités

- **Envoyer un message** : Cette API permet à toute application d'envoyer un message à un groupe de destinataires configurés dans l'API.
  
## Endpoints

### `POST /send-message`

Ce point d'API permet d'envoyer un message.

#### Paramètres de la requête

L'application qui appelle l'API doit envoyer une requête POST avec un objet JSON contenant la clé suivante :

- **message** (requise) : Le contenu du message à envoyer.

#### Exemple de requête

```bash
POST /send-message
Content-Type: application/json

{
  "message": "Ceci est un exemple de message."
}
```
#### Réponses
Réponse réussie (status HTTP 200) :
```Message envoyé avec succès !```

#### Exemple de réponse :
```json
Copier le code
{
  "status": "success",
  "message": "Message envoyé avec succès!"
}
```
#### Réponse en cas d'erreur (status HTTP 400 ou 500) :
```Erreur lors de l'envoi du message.```
Exemple de réponse :

```json
Copier le code
{
  "status": "error",
  "error": "Message trop court"
}
```
## Fonctionnement interne
L'API gère la configuration du numéro Signal et la liste des destinataires. Ces configurations sont définies dans l'API elle-même, et non par l'application cliente.
Toute application qui veut utiliser l'API doit envoyer uniquement une donnée JSON avec un champ message.
L'API se charge de traiter et d'envoyer ce message aux destinataires configurés.
Lorsqu'une requête est reçue, l'API vérifie si le message est valide et renvoie une réponse de succès ou d'erreur en fonction du résultat.

## Installation

#### Clonez ce dépôt sur votre machine locale.
bash
```git clone https://github.com/votre-utilisateur/gem-api.git```

#### Accédez au répertoire du projet.
bash
```cd gem-api```

#### Installez les dépendances.
bash
```npm install```

#### Démarrez le serveur.
bash
```npm start```
Le serveur sera lancé sur http://localhost:3000 par défaut.

## Dépendances
Node.js
Express (ou tout autre framework que vous utilisez pour créer l'API)

## Auteurs
#### Neville Mitsh - Développeur principal

Licence
Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## Remarques
L'API ne nécessite aucune interface utilisateur frontend. Les applications qui souhaitent l'utiliser doivent simplement envoyer des données JSON au point d'API /send-message.
Cette API gère l'authentification, les numéros Signal, et les destinataires en interne.
