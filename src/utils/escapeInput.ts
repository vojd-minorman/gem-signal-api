// Cette fonction transforme les entrées en chaînes sécurisées en évitant l'exécution de commandes
export const escapeInput = (input: string): string => {
    return input.replace(/[\r\n\x00\x1a]/g, ''); // Supprimer les caractères spéciaux comme retour chariot, nouvelle ligne, NULL, etc.
  };
  