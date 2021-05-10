const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const SVGtoPDF = require('svg-to-pdfkit');
const axios = require('axios');
const ShemaDeviscolis = require('../Models/modelDevisColis');
const dataVille = require('../datasVille');
const dataCategory = require('../datasCategorie');

///
// consultation tous les colis  en base de donnees
///

exports.tousDeviscolis = (req, res) => {
  ShemaDeviscolis.find()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};

///
// generateur devisColis PDF
///
exports.generateurPDFColis = (req, res) => {
  const doc = new PDFDocument();
  console.log(req.body);

  // reiecriture entête d'envois pour telechergment direct
  res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader('Content-Disposition', 'attachment; filename=DevisColisDenDistri.pdf');
  res.status(200);

  doc.text('Bon envoi colis a scanner par le livreur', 100, 100)
    .moveDown(2);
  doc.text(`livraison prevu le : ${req.body.datedeviselecro}`)
    .moveDown(2);
  doc.text(`Adresse de livraison : ${req.body.ville_depart.adresse}`)
    .moveDown(0);
  doc.text(`ville de livraison : ${req.body.ville_depart.ville}`)
    .moveDown(0);
  doc.text(`contact de livraison : ${req.body.ville_depart.contact}`)
    .moveDown(0);
  doc.text(`telephone contact de livraison : ${req.body.ville_depart.telephone}`)
    .moveDown(0);
  doc.text(`commentaire de livraison : ${req.body.ville_depart.commentaire}`)
    .moveDown(0);
  doc.text(`mail contact  de livraison: ${req.body.ville_depart.email}`)
    .moveDown(5);
  doc.text(`adresse de destination : ${req.body.ville_arrive.adresse}`)
    .moveDown(0);
  doc.text(`ville  de destination : ${req.body.ville_arrive.ville}`)
    .moveDown(0);
  doc.text(`nom contact de destination : ${req.body.ville_arrive.contact}`)
    .moveDown(0);
  doc.text(`telephone contact  : ${req.body.ville_arrive.telephone}`)
    .moveDown(0);
  doc.text(`mail contact de destination : ${req.body.ville_arrive.email}`)
    .moveDown(0);
  doc.text(`commentaire contact  : ${req.body.ville_arrive.contact}`)
    .moveDown(5);
  doc.text(`mail contact de destination : ${req.body.ville_arrive.email}`)
    .moveDown(0);
  doc.text('fin');

  // ajout qrcode au pdf avec svg to pdf
  SVGtoPDF(doc, QRCode.toString('I am a pony!', {
    type: 'svg',
    version: 5, //  Version du QR Code calculé
    errorCorrectionLevel: 'H', //  Niveau de correction d'erreur
  }, (err, url) => url), 400, 200, { width: 150, height: 150 });

  doc.on('finish', () => { console.log('fini'); });

  // HTTP response

  doc.pipe(res);
  doc.end();
};

///
// enregistrement devis colis en base de donnees
///

exports.enregistrementsDataBase = (req, res, next) => {
  const nouveauDevisColis = new ShemaDeviscolis({
    expediteur: {
      nom: req.body.expediteur.nom,
      prenom: req.body.expediteur.prenom,
      adresse: req.body.expediteur.adresse,
      code_postale: req.body.expediteur.code_postale,
      email: req.body.expediteur.email,
      telephone: req.body.expediteur.telephone,
      commentaire: req.body.expediteur.commentaire,
    },
    destinataire: {
      nom: req.body.destinataire.nom,
      prenom: req.body.destinataire.prenom,
      adresse: req.body.destinataire.adresse,
      code_postale: req.body.destinataire.code_postale,
      email: req.body.destinataire.email,
      telephone: req.body.destinataire.telephone,
      commentaire: req.body.destinataire.commentaire,
    },
    reference_colis: {
      numero: req.body.reference_colis.numero,
      date_enregistrement: req.body.reference_colis.date_enregistrement,
      etat: {
        livraison: req.body.reference_colis.etat.livraison,
        payement: req.body.reference_colis.etat.payement,
      },
      types: req.body.reference_colis.types,
    },
  });
  nouveauDevisColis.save()
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

///
// calculateur de distance pour livraison
///

exports.calculateurDistancePrix = (req, res) => {
  // recuperation coordonne gpe ville
  const coordonneeGpsDepart = dataVille.filter(
    (e) => e.nom_ville === req.body.devisElectroDepart.ville,
  )[0].coordonnee;

  const coordonneeGpsArrive = dataVille.filter(
    (e) => e.nom_ville === req.body.devisElectroArrive.ville,
  )[0].coordonnee;

  // recupe poids
  console.log(req.body);
  const { poids } = req.body.paramMeubleElectro;
  // calcule volume

  const volume = req.body.paramMeubleElectro.longeur * req.body.paramMeubleElectro.largeur * req.body.paramMeubleElectro.hauteur;

  axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${coordonneeGpsDepart.lat},${coordonneeGpsDepart.long};${coordonneeGpsArrive.lat},${coordonneeGpsArrive.long}?access_token=${process.env.KEY_BOX_MAP}`)
    .then((e) => {
      const estimationPrix = ((e.data.routes[0].distance * 0.20) / 1000) + (volume * 3 / 30000) + (poids * 0.20);
      const distanceLivraison = e.data.routes[0].distance / 1000;
      res.status(200).json({
        prix: estimationPrix,
        distance_livraison: distanceLivraison,
        volume,
      });
    })
    .catch((e) => { res.satus(502).json(e); });
};
