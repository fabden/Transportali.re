const Livreurs = require('../Models/modelLivreurs');

// consultation tout produits
exports.consustationTousLivreurs = (req, res, next) => {
  Livreurs.find()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};

// creation produits
exports.CreationLivreurs = (req, res, next) => {
  const nouveauproduit = new Livreurs({
    nom_livreur: "{ type: String, required: true }",
    contact_livreur: "{ type: String, require: true }",
    adresse_livreur: "{ type: String, require: true }",
    code_postale_livreur: "{ type: String, require: true }",
    email_livreur: "{ type: String, required: true }",
    telephone_livreur: 4544,
  });

  nouveauproduit.save()
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((e) => { console.log(e); });
};

// modification produits
exports.modificationLivreurs = (req, res, next) => {
  const { _id } = req.body;
  console.log(req.body._id);
  Livreurs.updateOne({ _id },
    {
      nom_produits: req.body.nom_produits,
      longeur_produits: req.body.longeur_produits,
      largeur_produits: req.body.largeur_produits,
      hauteur_produits: req.body.hauteur_produits,
      poids_produits: req.body.poids_produits,
    })
    .then((e) => {
      console.log('produit modifier sur sevreur ');
      res.status(200).json({
        message: 'Élément modifié',
      });
    })
    .catch((e) => { console.log(e); });
};

// suppression produits
exports.suppresionLivreurs = (req, res, next) => {
  const { id } = req.query;
  Livreurs.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({
        message: 'Élément supprimé',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};
