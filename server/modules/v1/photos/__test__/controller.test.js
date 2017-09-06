const assert = require('assert');
const request = require('superagent');

const controller = require('../controller');
const Photos = require('../model');

const userId = 'thisisatestuserid';

console.log('Photos test', global.env);

describe('Photos Controller', () => {

  beforeEach((done) => {
    photo1 = new Photos({
      userId: userId,
      photoTitle: 'Photo Title',
      photoDescription: 'Test Photo description',
      photoPath: 'testPhotoPath',
      photoName: 'testPhotoName',
      photoNameThumb: 'testPhotoNameThumb',
      photoExtension: 'testPhotoExtension',
      photoTags: ['testTag1', 'testTag2'],
      photoDeleted: false,
      photoOriginalName: 'testphoto.jpg',
    });
    photo2 = new Photos({
      userId: userId,
      photoTitle: 'Photo Title',
      photoDescription: 'Test Photo description',
      photoPath: 'testPhotoPath',
      photoName: 'testPhotoName',
      photoNameThumb: 'testPhotoNameThumb',
      photoExtension: 'testPhotoExtension',
      photoTags: ['testTag1', 'testTag2'],
      photoDeleted: false,
      photoOriginalName: 'testphoto.jpg',
    });
    photo3 = new Photos({
      userId: userId,
      photoTitle: 'Photo Title',
      photoDescription: 'Test Photo description',
      photoPath: 'testPhotoPath',
      photoName: 'testPhotoName',
      photoNameThumb: 'testPhotoNameThumb',
      photoExtension: 'testPhotoExtension',
      photoTags: ['testTag1', 'testTag2'],
      photoDeleted: false,
      photoOriginalName: 'testphoto.jpg',
    });
    photo4 = new Photos({
      userId: userId,
      photoTitle: 'Photo Title',
      photoDescription: 'Test Photo description',
      photoPath: 'testPhotoPath',
      photoName: 'testPhotoName',
      photoNameThumb: 'testPhotoNameThumb',
      photoExtension: 'testPhotoExtension',
      photoTags: ['testTag1', 'testTag2'],
      photoDeleted: false,
      photoOriginalName: 'testphoto.jpg',
    });
    Promise.all([photo1.save(), photo2.save(), photo3.save(), photo4.save()])
      .then(() => done());
  });

  // router.get('/photos', requireAuth, Photos.all);
  it('All photos', (done) => {
    request
      .get('http://localhost:4080/apiv1/photos')
      .then((res) => {
        assert(res.status === 200);
        const result = JSON.parse(res.text);
        assert(result[0].userId, userId);
        done();
      })
      .catch((err) => {
        assert.ifError(err);
        done();
      });
    });
  // router.get('/user', requireAuth, Photos.user);
  // router.get('/:id', requireAuth, Photos.one);
  // router.post('/', requireAuth, upload, Photos.create);
  // router.patch('/:id', requireAuth, Photos.patch);
  // router.get('/trash/user', requireAuth, Photos.userTrash);
  // router.delete('/trash/user', requireAuth, Photos.emptyTrash);
});
