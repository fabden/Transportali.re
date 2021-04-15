const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateurPDF = (req, res, next) => {
  console.log('midelware generation pdf ');

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('file.pdf'));
  doc.text('PDF Devis colis', 50, 50);
  doc.end();
  next();
};

module.exports = generateurPDF;
