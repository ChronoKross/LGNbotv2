const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const commands = require("./botCommands/botCommands");
const {
  registerGlobalCommands,
  setupEventListeners,
} = require("./util/botUtils");
const createGoogleAuth = require("./util/googleAuth"); // Import the GoogleAuth function
const startExpress = require("./app");
const { google } = require("googleapis");
const listEvents = require("./util/listEvents");
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  await registerGlobalCommands(rest, commands);
})();

setupEventListeners(client);

client.login(process.env.DISCORD_TOKEN);
startExpress();

// Define month names array
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

(async () => {
  const authClient = await createGoogleAuth();
  const calendar = google.calendar({ version: "v3", auth: authClient });

  const calendarId =
    "d7609d4dbe74ca9bebf73103a660889b0149c3585d3445d0e8e167f4430a6906@group.calendar.google.com";

  try {
    console.log(`Fetching events from calendar ID: ${calendarId}`); // Log the calendar ID being used
    const res = await calendar.events.list({
      calendarId: calendarId, // Use the specific calendar ID
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    console.log("Upcoming Events:");
    if (res.data.items.length > 0) {
      res.data.items.forEach((event) => {
        const eventDate = new Date(event.start.dateTime || event.start.date);
        const eventMonth = monthNames[eventDate.getMonth()];
        console.log(`${eventMonth} - ${event.summary}`);
      });
    } else {
      console.log("No upcoming events found.");
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
})();
