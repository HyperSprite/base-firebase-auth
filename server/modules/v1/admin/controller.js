const admin = require('firebase-admin');

const serviceAccount = require('../../../config-firebase.json');

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_X509_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_URL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
