// Imports
const express = require('express');

const PartenairesLivreur= express.Router();

// import controleur

const ctrlLivreur = require('../Controleurs/ctrlLivreurs');

// enregistrement un colis en base de donnees
PartenairesLivreur.route('/')
  .get(ctrlLivreur.consultationTouspartenaires)
  .post(ctrlLivreur.Creationpartenaires)
  .delete(ctrlLivreur.suppresionpartenaires)
  .put(ctrlLivreur.modificationpartenaires);

// Export
module.exports = PartenairesLivreur;