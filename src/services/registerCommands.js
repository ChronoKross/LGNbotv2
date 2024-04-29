// registerCommands.js
const { REST, Routes } = require("discord.js");
require("dotenv").config();

async function registerCommands(commands) {
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  try {
    console.log("Started refreshing application (/) commands globally.");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("Successfully reloaded application (/) commands globally.");
  } catch (error) {
    console.error("Failed to register commands:", error);
  }
}

module.exports = registerCommands;
