const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const commands = require("./botCommands/botCommands");
const {
  registerGlobalCommands,
  setupEventListeners,
} = require("./util/botUtils");
const listEvents = require("./util/listEvents");
const createGoogleAuth = require("./util/googleAuth");
const startExpress = require("./app");
const { google } = require("googleapis");

require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  await registerGlobalCommands(rest, commands);
})();

// Setup event listeners with command handling
setupEventListeners(client);

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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "listevents") {
    const authClient = await createGoogleAuth();
    const calendar = google.calendar({ version: "v3", auth: authClient });

    const calendarId =
      "d7609d4dbe74ca9bebf73103a660889b0149c3585d3445d0e8e167f4430a6906@group.calendar.google.com";

    try {
      const res = await calendar.events.list({
        calendarId: calendarId,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });

      if (res.data.items.length > 0) {
        let replyMessage = "Upcoming Events:\n";
        res.data.items.forEach((event) => {
          const eventDate = new Date(event.start.dateTime || event.start.date);
          const eventMonth = monthNames[eventDate.getMonth()];
          replyMessage += `${eventMonth} - ${event.summary}\n`;
        });
        await interaction.reply(replyMessage);
      } else {
        await interaction.reply("No upcoming events found.");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      await interaction.reply("Failed to fetch events.");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
startExpress();
