// Imports
const express = require('express');

const devisDemenagemntRouteur = express.Router();

// enregistrement un devis demaenagement en base de donnees
devisDemenagemntRouteur.route('/')
  .get((req, res) => { console.log('chemin devis demenagement ok'); });

// Export
module.exports = devisDemenagemntRouteur;
