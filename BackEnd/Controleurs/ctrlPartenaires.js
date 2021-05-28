const PDFDocument = require('pdfkit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Partenaires = require('../Models/modelPartenaires');

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
        return res.status(400).json({ message: e });
      }
      const token = jwt.sign({ user: e._id, droit: 'parteniare' }, process.env.PHRASE_PASS, { expiresIn: 60 * 60 });

      if (e.password_partenaire === req.body.pass) {
        res.status(200).json({ token });
      } else {
        res.status(200).json({ message: 'login mots de pas inccorect' });
      }
    })
    .catch((e) => { res.status(400).json({ message: e }); });
};
