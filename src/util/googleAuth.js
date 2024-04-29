const { google } = require("googleapis");
require("dotenv").config();

const createGoogleAuth = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    },
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.auth.getClient({ auth });
};

module.exports = createGoogleAuth;
