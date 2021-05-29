const PDFDocument = require('pdfkit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Partenaires = require('../Models/modelPartenaires');
const modelDevis = require('../Models/modelDevis');

exports.generateurPDFPartenaires = (req, res) => {
  const doc = new PDFDocument();
  // doc.pipe(fs.createWriteStream('./telechargement/file.pdf')); // write to PDF
  doc.text('Bon envoi Partenaires a scanner par le livreur', 100, 100);
  doc.end();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=DevisPartenairesDenDistri.pdf');
  res.status(200);
  doc.pipe(res); // HTTP response
};

// consultation tout partenaires
exports.consultationTouspartenaires = (req, res, next) => {
  Partenaires.find()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};

// creation partenaires
exports.Creationpartenaires = (req, res, next) => {
  bcrypt.hash(req.body.password_partenaire, 10)
    .then((e) => {
      const nouveauproduit = new Partenaires({
        nom_partenaire: req.body.nom_partenaire,
        contact_partenaire: req.body.contact_partenaire,
        adresse_partenaire: req.body.adresse_partenaire,
        code_postale_partenaire: req.body.code_postale_partenaire,
        email_partenaire: req.body.email_partenaire,
        telephone_partenaire: req.body.telephone_partenaire,
        password_partenaire: e,
      });
      nouveauproduit.save()
        .then((e) => {
          res.status(200).json(e);
        })
        .catch((e) => { console.log(e); });
    })
    .catch((e) => { console.log(e); });
};

// modification partenaires
exports.modificationpartenaires = (req, res, next) => {
  bcrypt.hash(req.body.password_partenaire, 10)
    .then((e) => {

    })
    .catch((e) => { console.log(e); });

  const { _id } = req.body;
  Partenaires.updateOne({ _id },
    {
      nom_partenaire: req.body.nom_partenaire,
      contact_partenaire: req.body.contact_partenaire,
      adresse_partenaire: req.body.adresse_partenaire,
      code_postale_partenaire: req.body.code_postale_partenaire,
      email_partenaire: req.body.email_partenaire,
      telephone_partenaire: req.body.telephone_partenaire,
      password_partenaire: req.body.password_partenaire,
    })
    .then((e) => {
      console.log('parteniares modifier sur sevreur ');
      res.status(200).json({
        message: 'Élément modifié',
      });
    })
    .catch((e) => { console.log(e); });
};

// suppression partenaires
exports.suppresionpartenaires = (req, res, next) => {
  const { id } = req.query;
  Partenaires.deleteOne({ _id: id })
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

// connexions utilisateur
exports.connexionPartenaire = (req, res, next) => {
  Partenaires.findOne({ email_partenaire: req.body.login })
    .then((e) => {
      if (e === null) {
        return res.status(403).json({ message: 'erreur de connexions' });
      }
      const token = jwt.sign({ user: e._id, droit: 'partenaire' }, process.env.PHRASE_PASS, { expiresIn: 60 * 60 });
      if (e.password_partenaire === req.body.pass) {
        res.status(200).json({ token });
      } else {
        res.status(403).json({ message: 'login mots de pas inccorect' });
      }
    })
    .catch((e) => { res.status(403).json({ message: 'erreur de connexions' }); });
};

// chekcConnexion partenaire

exports.checkconnexionPartenaire = (req, res, next) => {
  jwt.verify(req.body.token, process.env.PHRASE_PASS, (err, token) => {
    if (err) { return res.status(200).json({ message: 'token non valide', etat: false }); }
    return res.status(200).json({ message: 'token ok', etat: true });
  });
};

// creation commande Partenaire

exports.commandePartenaire = (req, res, next) => {
  const decodeToken = jwt.decode(req.body.token);
  Partenaires.findById(decodeToken.user)
    .then((e) => {
      const monDevis = new modelDevis({
        expediteur: {
          id_Expediteur: e._id,
          contact: e.nom_partenaire,
          adresse: e.adresse_partenaire,
          code_postale: e.code_postale_partenaire,
          email: e.email_partenaire,
          telephone: e.telephone_partenaire,
          commentaire: ' commantaire expediteur',
        },

        destinataire: {
          contact: req.body.addressArriver.contact,
          adresse: req.body.addressArriver.adresse,
          code_postale: req.body.addressArriver.ville,
          email: req.body.addressArriver.email,
          telephone: req.body.addressArriver.telephone,
          commentaire: req.body.addressArriver.commentaire,
        },

        reference_colis: {
          numero: '{ type: String, require: true }',
          date_enregistrement: Date.now(),
          date_livraisons: '{ type: String, require: true }',
          etat: {
            livraison: 'En Attente',
            payement: 'facture prestataire',
          },
          types: 'partenaire',
          commentaire: 'commanatire genreal',
        },

      });
      monDevis.save();
    })
    .catch((e) => { console.log(e); });
};
