const router = require('express').Router();

const requireAuth = require('../../router/require-auth');

const Autocomplete = require('./autocomplete/router');
const PhotosRoutes = require('./photos/router');

router.get('/test', (req, res) => {
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
