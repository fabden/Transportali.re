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
    nom_livreur: req.body.nom_livreur,
    email_livreur: req.body.email_livreur,
    telephone_livreur: req.body.telephone_livreur,
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
      nom_livreur: req.body.nom_livreur,
      email_livreur: req.body.email_livreur,
      telephone_livreur: req.body.telephone_livreur,
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
  const { id } = req.params;
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
