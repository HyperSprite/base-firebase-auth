const router = require('express').Router();
const multer = require('multer');

const requireAuth = require('../../router/require-auth');

const upload = multer({
  dest: 'images/',
  onFileUploadStart(file) {
    console.log(file.originalname + ' is starting ...')
  },
}).single('files');
const Autocomplete = require('./autocomplete/router');
const PhotosRoutes = require('./photos/router');

router.get('/test', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ test: 'Open' }));
});
router.get('/secret', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ secret: 'Authorized' }));
});

router.use('/autocomplete', Autocomplete);
router.use('/photos', PhotosRoutes);


module.exports = router;
