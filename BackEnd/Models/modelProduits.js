// Import
const mongoose = require('mongoose');

// Schema pour Partenaires
const modelProduits = mongoose.Schema({

  nom_produits: { type: String },
  longeur_produits: { type: Number },
  largeur_produits: { type: Number },
  poids_produits: { type: Number },

});

// export schema pour Partenaires
module.exports = mongoose.model('Produits', modelProduits);
