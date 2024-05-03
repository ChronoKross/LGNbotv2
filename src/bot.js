const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const commands = require("./botCommands/botCommands");
const {
  registerGlobalCommands,
  setupEventListeners,
} = require("./util/botUtils");
const listEvents = require("./util/listEvents"); // Ensure this is imported correctly
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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "listevents") {
    try {
      const authClient = await createGoogleAuth();
      const calendarId =
        "d7609d4dbe74ca9bebf73103a660889b0149c3585d3445d0e8e167f4430a6906@group.calendar.google.com";

      // Call the listEvents function with the correct parameters
      const events = await listEvents(authClient, calendarId);
      if (events.length === 0) {
        await interaction.reply("No upcoming events found.");
      } else {
        let replyMessage = "Upcoming Events:\n";
        events.forEach((event) => {
          replyMessage += `${event.date} - ${event.summary}\n`;
        });
        await interaction.reply(replyMessage);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      await interaction.reply("Failed to fetch events.");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
startExpress();
