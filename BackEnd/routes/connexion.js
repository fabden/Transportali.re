// Imports
const express = require('express');
const ctrlConnexion = require('../Controleurs/ctrlConnexion');

// import controleur
const connexion = express.Router();

// enregistrement un colis en base de donnees
connexion.route('/')
  .post(ctrlConnexion.connexion);

// Export

module.exports = connexion;
