const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const commands = require("./botCommands/botCommands");
const {
  registerGlobalCommands,
  setupEventListeners,
} = require("./util/botUtils");
const createGoogleAuth = require("./util/googleAuth"); // Import the GoogleAuth function

require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// Create GoogleAuth instance with environment variables
const googleAuth = createGoogleAuth({
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirect_uri: process.env.GOOGLE_REDIRECT_URI,
});

(async () => {
  await registerGlobalCommands(rest, commands);
})();

setupEventListeners(client);

client.login(process.env.TOKEN);
