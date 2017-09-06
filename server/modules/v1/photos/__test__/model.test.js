const assert = require('assert');

const Photos = require('../model');

describe('Photos Model', () => {

  let photo;

  beforeEach((done) => {
    photo = new Photos({
      userId: '59979626b52f9a05d893f2e9',
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
    photo.save()
    // .then(() => done());
      .then(() => {
        assert(!photo.isNew);
        done();
      });
  });

  function assertName(operation, expected, done) {
    operation
      .then(() => Photos.find({}))
      .then((photos) => {
        assert(photos.length === 1);
        assert.equal(photos[0].photoTitle, expected);
        done();
      });
  }

  it('Read a record', (done) => {
    Photos.find({ photoOriginalName: 'testphoto.jpg' })
      .then((result) => {
        assert.equal(result[0].photoName, 'testPhotoName');
        done();
      });
  });

  it('Update a record', (done) => {
    assertName(
      Photos.findOneAndUpdate({ photoTitle: 'Photo Title' }, { photoTitle: 'Image 1' }),
      'Image 1',
      done
    );
  });

  it('Remove a record', (done) => {
    Photos.remove({ photoNameThumb: 'testPhotoNameThumb' })
      .then(() => Photos.findOne({ photoNameThumb: 'testPhotoNameThumb' }))
      .then((result) => {
        assert(result === null);
        done();
      });
  });

  it('requires a photoTitle', () => {
    const photo = new Photos({ photoTitle: undefined });
    const validationResult = photo.validateSync();
    const { message } = validationResult.errors.photoTitle;

    assert(message === 'A Title is required');
  });

  it('requires a photoTitle longer than 4 characters', () => {
    const photo = new Photos({ photoTitle: 'tmp' });
    const validationResult = photo.validateSync();
    const { message } = validationResult.errors.photoTitle;

    assert(message === 'Title must be longer than 4 characters.');
  });

  it('disallows invalid records from being saved', (done) => {
    const photo = new Photos({ photoTitle: 'temp' });
    photo.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.photoTitle;

        assert(message === 'Title must be longer than 4 characters.');
        done();
      });
  });
});
