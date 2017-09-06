const router = require('express').Router();

const requireAuth = require('../../../router/require-auth');

const Autocomplete = require('./controller');

router.get('/user', requireAuth, Autocomplete.user);

module.exports = router;
