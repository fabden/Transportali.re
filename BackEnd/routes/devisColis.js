// Imports
const express = require('express');

const devisColisRouteur = express.Router();

// enregistrement un colis en base de donnees
devisColisRouteur.route('/')
  .get((req, res) => { console.log('chemin colis ok'); });

// Export
module.exports = devisColisRouteur;
