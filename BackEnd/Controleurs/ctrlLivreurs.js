const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Livreurs = require('../Models/modelLivreurs');

// consultation tout livreurs
exports.consustationTousLivreurs = (req, res, next) => {
  Livreurs.find()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};

// creation livreurs
exports.CreationLivreurs = (req, res, next) => {
  const nouveauproduit = new Livreurs({
    nom_livreur: req.body.nom_livreur,
    email_livreur: req.body.email_livreur,
    telephone_livreur: req.body.telephone_livreur,
    password_livreur: req.body.password_livreur,
  });

  nouveauproduit.save()
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((e) => { console.log(e); });
};

// modification livreurs
exports.modificationLivreurs = (req, res, next) => {
  const { _id } = req.body;
  console.log(req.body._id);
  Livreurs.updateOne({ _id },
    {
      nom_livreur: req.body.nom_livreur,
      email_livreur: req.body.email_livreur,
      telephone_livreur: req.body.telephone_livreur,
      password_livreur: req.body.password_livreur,
    })
    .then((e) => {
      console.log('produit modifier sur sevreur ');
      res.status(200).json({
        message: 'Élément modifié',
      });
    })
    .catch((e) => { console.log(e); });
};

// suppression livreurs
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
/// //////
// connexions livreurs
exports.connexionLivreur = (req, res, next) => {
  Livreurs.findOne({ email_livreur: req.body.login })
    .then((e) => {
      if (e === null) {
        return res.status(403).json({ message: 'erreur de connexions' });
      }
      const token = jwt.sign({ user: e._id, droit: 'Livreur' }, process.env.PHRASE_PASS, { expiresIn: 60 * 60 });
      if (e.password_livreur === req.body.pass) {
        res.status(200).json({ token });
      } else {
        res.status(403).json({ message: 'login mots de pas inccorect' });
      }
    })
    .catch((e) => { res.status(403).json({ message: 'erreur de connexions' }); });
};

// chekcConnexion livreur

exports.checkconnexionLivreur = (req, res, next) => {
  jwt.verify(req.body.token, process.env.PHRASE_PASS, (err, token) => {
    if (err) { return res.status(200).json({ message: 'token non valide', etat: false }); }
    return res.status(200).json({ message: 'token ok', etat: true });
  });
};
/// ///
