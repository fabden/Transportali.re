// Imports
const express = require('express');

const LivreurRouteur = express.Router();

// import controleur

const ctrlLivreur = require('../Controleurs/ctrlLivreurs');

// enregistrement un colis en base de donnees
LivreurRouteur.route('/')
  .get(ctrlLivreur.consustationTousLivreurs)
  .post(ctrlLivreur.CreationLivreurs)
  .delete(ctrlLivreur.suppresionLivreurs)
  .put(ctrlLivreur.modificationLivreurs);

// Export
module.exports = LivreurRouteur;
