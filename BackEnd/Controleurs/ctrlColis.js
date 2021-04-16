const PDFDocument = require('pdfkit');

exports.generateurPDFColis = (req, res) => {
  console.log('midelware generation pdf ');

  const doc = new PDFDocument();
  // doc.pipe(fs.createWriteStream('./telechargement/file.pdf')); // write to PDF
  doc.text('Bon envoi colis a scanner par le livreur', 100, 100);
  doc.end();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=DevisColisDenDistri.pdf');
  res.status(200);
  doc.pipe(res); // HTTP response
};
