const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config').config;

console.log(config.mongoconnect.test);

before((done) => {
  mongoose.connect(config.mongoconnect.test, {
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
  Promise.all([
    mongoose.connection.collections.photos.drop(() => null),
    mongoose.connection.collections.users.drop(() => null),
  ]).then(() => done());
});
