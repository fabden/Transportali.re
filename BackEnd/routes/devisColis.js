// Imports
const express = require('express');

const devisColisRouteur = express.Router();

// enregistrement un colis en base de donnees
devisColisRouteur.route('/')
  .get((req, res) => {
    console.log('chemin colis ok');
    res.download('file.pdf');
  });

// Export
module.exports = devisColisRouteur;
