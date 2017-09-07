const assert = require('assert');

const User = require('../../../../models/user');
// const User = require('../model');
const controller = require('../controller');

console.log('User test');

describe('User Controller', () => {

  beforeEach((done) => {
    user1 = new User({
      email: 'user1@test.com',
      password: 'user1@test.com',
      userName: 'user1@test.com',
      accessToken: 'user1@test.com',
      resourceState: 3,
      firstname: 'User1',
      lastname: 'Super1',
      locationPref: false,
      premium: false,
    });
    user2 = new User({
      email: 'user2@test.com',
      password: 'user2@test.com',
      userName: 'user2@test.com',
      accessToken: 'user2@test.com',
      resourceState: 3,
      firstname: 'User2',
      lastname: 'Super2',
      locationPref: false,
      premium: false,
    });
    user3 = new User({
      email: 'user3@test.com',
      password: 'user3@test.com',
      userName: 'user3@test.com',
      accessToken: 'user3@test.com',
      resourceState: 3,
      firstname: 'User3',
      lastname: 'Super3',
      locationPref: false,
      premium: false,
    });
    user4 = new User({
      email: 'user4@test.com',
      password: 'user4@test.com',
      userName: 'user4@test.com',
      accessToken: 'user4@test.com',
      resourceState: 3,
      firstname: 'User4',
      lastname: 'Super4',
      locationPref: false,
      premium: false,
    });
    Promise.all([user1.save(), user2.save(), user3.save(), user4.save()])
      .then(() => done());
  });

  it.skip('User find', (done) => {
    User.find({})
      .then((result) => {
        assert(result.isArray === true);
        done();
      });
  });
});
