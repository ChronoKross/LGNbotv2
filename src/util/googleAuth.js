const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const createGoogleAuth = () => {
  // Read the credentials from keys.json in the root directory
  const keysPath = path.join(__dirname, "..", "keys.json");
  const keys = JSON.parse(fs.readFileSync(keysPath));
  console.log(keys.private_key);
  const auth = new google.auth.JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return auth;
};

module.exports = createGoogleAuth;
