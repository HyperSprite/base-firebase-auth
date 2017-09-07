const assert = require('assert');
const Request = require('mock-express-request');
const Response = require('mock-express-response');
// const request = require('superagent');

const controller = require('../controller');
const Photos = require('../model');

const userId = 'test_user_id';

const mochaAsync = (fn) => {
  return async () => {
    try {
      await fn();
      // return;
    } catch (err) {
      // return;
    }
  };
};

console.log('Photos test');

describe('Photos Controller', () => {
  let photo1;
  let photo2;
  let photo3;
  let photo4;

  beforeEach((done) => {
    photo1 = new Photos({
      userId: userId,
      photoTitle: 'Photo Title 1',
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
      photoTitle: 'Photo Title 2',
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
      photoTitle: 'Photo Title 3',
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
      photoTitle: 'Photo Title 4',
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
  it('Controller: all photos', (done) => {
    const request = new Request();
    const response = new Response({
      request: request,
      finish: () => {
        assert(response.statusCode === 200);
        assert(response._getJSON()[0].photoName === 'testPhotoName');
        done();
      }
    });
    controller.all(request, response);
  });
  // router.get('/user', requireAuth, Photos.user);
  it('Controller: all photos by a user', (done) => {
    const request = new Request({
      user: {
        _id: userId,
      },
    });
    const response = new Response({
      request: request,
      finish: () => {
        assert(response.statusCode === 200);
        assert(response._getJSON()[0].photoTitle === photo1.photoTitle);
        done();
      }
    });
    controller.user(request, response);
  });
  // router.get('/:id', requireAuth, Photos.one);
  it('Controller: one photo by id', (done) => {
    const request = new Request({
      // body: {
        params: {
          id: photo1._id,
        },
      // },
    });
    const response = new Response({
      request: request,
      finish: () => {
        assert(response.statusCode === 200);
        assert(response._getJSON()[0].photoTitle === photo1.photoTitle);
        done();
      }
    });
    controller.one(request, response);
  });
  // router.post('/', requireAuth, upload, Photos.create);
  // router.patch('/:id', requireAuth, Photos.patch);
  // router.get('/trash/user', requireAuth, Photos.userTrash);
  // router.delete('/trash/user', requireAuth, Photos.emptyTrash);
});
