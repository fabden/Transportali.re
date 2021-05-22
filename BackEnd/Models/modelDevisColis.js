// Import
const mongoose = require('mongoose');

// Schema pour devis colis
const modelDevisColisSchema = mongoose.Schema({

  expediteur: {
    nom: { type: String, required: true },
    prenom: { type: String, require: true },
    adresse: { type: String, require: true },
    code_postale: { type: String, require: true },
    email: { type: String, required: true },
    telephone: { type: Number, required: true },
    commentaire: { type: String },
  },

  destinataire: {
    nom: { type: String, required: true },
    prenom: { type: String, require: true },
    adresse: { type: String, require: true },
    code_postale: { type: String, require: true },
    email: { type: String, required: true },
    telephone: { type: Number, required: true },
    commentaire: { type: String },
  },

  reference_colis: {
    numero: { type: String, require: true },
    date_enregistrement: { type: Date, require: true },
    etat: {
      livraison: { type: String, require: true },
      payement: { type: String, require: true },
    },
    types: { type: String, require: true },
    commentaire: { type: String },
  },

});

// export schema devi colis
module.exports = mongoose.model('devis_colis', modelDevisColisSchema);
