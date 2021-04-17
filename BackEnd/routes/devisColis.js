// Imports
const express = require('express');
const ctrlColis = require('../Controleurs/ctrlColis');

// import controleur
const devisColisRouteur = express.Router();

// enregistrement un colis en base de donnees
devisColisRouteur.route('/')
  .get(ctrlColis.generateurPDFColis)
  .put(ctrlColis.tousDeviscolis);

// Export

module.exports = devisColisRouteur;
