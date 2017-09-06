const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config').config;

console.log('test-helper loaded');

before((done) => {
  global.env = config;
  mongoose.connect(global.env.mongoconnect.test, {
    useMongoClient: true,
  });
  mongoose.connection
    .once('open', () => {
      setTimeout(() => {
        done();
      }, 300);
    })
    .on('error', (error) => {
      console.warn('\n\nERROR: test/test-helper.test.js before\n\n', error);
    });
});

// beforeEach is a hook
beforeEach((done) => {
  mongoose.connection.collections.photos.drop(() => {
    done();
  });
});
