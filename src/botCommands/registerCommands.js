const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config(); // Make sure to have your .env file with necessary IDs and token

const commands = [
  {
    name: "listevents",
    description: "Lists upcoming events from the Google Calendar",
  },
  // Add more commands here if needed
];

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Failed to register application commands:", error);
  }
})();
