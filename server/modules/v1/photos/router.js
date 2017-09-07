const router = require('express').Router();
const multer = require('multer');

const requireAuth = require('../../../router/require-auth');

const upload = multer({
  dest: 'images/',
  onFileUploadStart(file) {
    console.log(`${file.originalname} is starting ...`);
  },
}).single('files');

const Photos = require('./controller');

router.get('/user', requireAuth, Photos.user);
router.get('/', Photos.all);
router.get('/:id', Photos.one);
router.post('/', requireAuth, upload, Photos.create);
router.patch('/:id', requireAuth, Photos.patch);
router.get('/trash/user', requireAuth, Photos.userTrash);
router.delete('/trash/user', requireAuth, Photos.emptyTrash);

module.exports = router;
