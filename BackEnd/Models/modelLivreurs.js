// Import
const mongoose = require('mongoose');

// Schema pour Partenaires
const modelLivreurs = mongoose.Schema({
  nom_livreur: { type: String, required: true },
  email_livreur: { type: String },
  telephone_livreur: { type: Number, required: true },
  password_livreur: { type: String, required: true },

});

// export schema pour Partenaires
module.exports = mongoose.model('Livreurs', modelLivreurs);
