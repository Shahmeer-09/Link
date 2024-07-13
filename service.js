var admin = require("firebase-admin");

// var serviceAccount = require("./config/ServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(
    {
      type: process.env.TYPE,
      project_id: process.env.PROJECTID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URL,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
      client_x509_cert_url: process.env.CLIENT_CERT_URL,
      universe_domain:process.env.UNIVERSE_DOMAIN
    }
  )
});

module.exports = admin;