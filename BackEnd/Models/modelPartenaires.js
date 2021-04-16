// Import
const mongoose = require('mongoose');

// Schema pour Partenaires
const modelPartenaires = mongoose.Schema({

  expediteur: {
    nom: { type: String, required: true },
    prenom: { type: String, require: true },
    adresse: { type: String, require: true },
    code_postale: { type: String, require: true },
    Email: { type: String, required: true },
    Telephone: { type: Number, required: true },
  },

  destinataire: {
    nom: { type: String, required: true },
    prenom: { type: String, require: true },
    adresse: { type: String, require: true },
    code_postale: { type: String, require: true },
  },

  Reference_demenagement: {
    numero: { type: String, require: true },
    date_enregistrement: { type: Date, require: true },
    commentaire: { type: String },
    nombre_colis: { type: Number },
  },

});

// export schema pour Partenaires
module.exports = mongoose.model('devisColis', modelPartenaires);
