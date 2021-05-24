const Produits = require('../Models/modelProduits');

// consultation tout produits
exports.consustationTousProduits = (req, res, next) => {
  Produits.find()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};

// creation produits
exports.CreationProduits = (req, res, next) => {
  const nouveauproduit = new Produits({
    nom_produits: req.body.nom_produits,
    longeur_produits: req.body.longeur_produits,
    largeur_produits: req.body.largeur_produits,
    hauteur_produits: req.body.hauteur_produits,
    poids_produits: req.body.poids_produits,
  });

  nouveauproduit.save()
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((e) => { console.log(e); });
};

// modification produits
exports.modificationProduits = (req, res, next) => {
  const { _id } = req.body;
  console.log(req.body._id);
  Produits.updateOne({ _id },
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
exports.suppresionProduits = (req, res, next) => {
  const { id } = req.query;
  Produits.deleteOne({ _id: id })
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
