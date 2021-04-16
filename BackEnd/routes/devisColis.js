// Imports
const express = require('express');
const ctrlColis = require('../Controleurs/ctrlColis');

// import controleur
const devisColisRouteur = express.Router();

// enregistrement un colis en base de donnees
devisColisRouteur.route('/')
  .put(ctrlColis.enregistrementsDataBase, ctrlColis.generateurPDFColis)
  .get(ctrlColis.tousDeviscolis);

// Export

module.exports = devisColisRouteur;
