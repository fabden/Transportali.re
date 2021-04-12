// Import
const multer = require('multer');

// const upload = multer({ dest: '../Public/images/menus' });

// Mime types of the files
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

// storing files to disk
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'Public/images/menus');
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${file.fieldname + Date.now()}.${extension}`);
  },
});

// Exports multer
module.exports = multer({ storage });
