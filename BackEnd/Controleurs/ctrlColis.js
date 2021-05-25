const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const SVGtoPDF = require('svg-to-pdfkit');
const axios = require('axios');
const ShemaDeviscolis = require('../Models/modelDevisColis');
const dataVille = require('../datasVille');

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
  doc.text(`commentaire contact  : ${req.body.ville_arrive.commentaire}`)
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
      contact: req.body.ville_depart.contact,
      adresse: req.body.ville_depart.adresse,
      code_postale: req.body.ville_depart.ville,
      email: req.body.ville_depart.email,
      telephone: req.body.ville_depart.telephone,
      commentaire: req.body.ville_depart.commentaire,
    },
    destinataire: {
      contact: req.body.ville_arrive.contact,
      adresse: req.body.ville_arrive.adresse,
      code_postale: req.body.ville_arrive.ville,
      email: req.body.ville_arrive.email,
      telephone: req.body.ville_arrive.telephone,
      commentaire: req.body.ville_arrive.commentaire,
    },
    reference_colis: {
      numero: 'req.body.reference_colis.numero',
      date_enregistrement: Date.now(),
      date_livraisons: req.body.datedeviselecro,
      etat: {
        livraison: 'En cours',
        payement: 'req.body.reference_colis.etat.payement',
      },
      types: req.body.ville_depart.type,
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

  const { poids_produits } = req.body.paramMeubleElectro;
  // calcule volume
  const volume = req.body.paramMeubleElectro.longeur_produits * req.body.paramMeubleElectro.largeur_produits * req.body.paramMeubleElectro.hauteur_produits;

  axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${coordonneeGpsDepart.lat},${coordonneeGpsDepart.long};${coordonneeGpsArrive.lat},${coordonneeGpsArrive.long}?access_token=${process.env.KEY_BOX_MAP}`)
    .then((e) => {
      const estimationPrix = ((e.data.routes[0].distance * 0.20) / 1000) + (volume * 3 / 30000) + (poids_produits * 0.20);
      const distanceLivraison = e.data.routes[0].distance / 1000;
      res.status(200).json({
        prix: estimationPrix,
        distance_livraison: distanceLivraison,
        volume,
      });
    })
    .catch((e) => { res.status(502).json(e); });
};
