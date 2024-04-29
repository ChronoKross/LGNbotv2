const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const commands = require("./botCommands/botCommands");
const {
  registerGlobalCommands,
  setupEventListeners,
} = require("./util/botUtils");
const createGoogleAuth = require("./util/googleAuth"); // Import the GoogleAuth function
const startExpress = require("./app");
const { google } = require("googleapis");

require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  await registerGlobalCommands(rest, commands);
})();

setupEventListeners(client);

client.login(process.env.TOKEN);
startExpress();
(async () => {
  const authClient = await createGoogleAuth();
  const calendar = google.calendar({ version: "v3", auth: authClient });

  try {
    const res = await calendar.events.list({
      calendarId: "primary", // or any specific calendar ID
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    console.log("Upcoming Events:");
    res.data.items.forEach((event) => {
      console.log(
        `${event.start.dateTime || event.start.date} - ${event.summary}`
      );
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
})();
