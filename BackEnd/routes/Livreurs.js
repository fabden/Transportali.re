// Imports
const express = require('express');

const LivreurRouteur = express.Router();

// import controleur

const ctrlLivreur = require('../Controleurs/ctrlLivreurs');

// enregistrement un colis en base de donnees
LivreurRouteur.route('/')
  .get(ctrlLivreur.consustationTousLivreurs)
  .post(ctrlLivreur.CreationLivreurs)
  .delete(() => {})
  .put(ctrlLivreur.modificationLivreurs);

LivreurRouteur.route('/:id')
  .get(() => { console.log('modif un partenaire'); })
  .post(() => {})
  .delete(ctrlLivreur.suppresionLivreurs)
  .put(() => {});

LivreurRouteur.route('/connexions')
  .get(() => { console.log('connexion livreur'); });

// Export
module.exports = LivreurRouteur;
