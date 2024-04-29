const { google } = require("googleapis");

const createGoogleAuth = (credentials) => {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const getAccessToken = async () => {
    const authToken = await auth.getAccessToken();
    return authToken.token;
  };

  return { getAccessToken };
};

module.exports = createGoogleAuth;
