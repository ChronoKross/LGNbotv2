const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const express = require("express");
require("dotenv").config();

const app = express();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "hello",
    description: "Replies with Hello World!",
  },
  {
    name: "lgn",
    description: "Replies with LGN is #1!",
  },
];

// Register commands globally
(async () => {
  try {
    console.log("Started refreshing application (/) commands globally.");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID), // Changed to global command registration
      { body: commands }
    );
    console.log("Successfully reloaded application (/) commands globally.");
  } catch (error) {
    console.error(error);
  }
})();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "hello") {
    await interaction.reply("Hello World!");
  } else if (commandName === "lgn") {
    await interaction.reply("LGN is #1!");
  } else if (commandName === "whattimeisit") {
    const time = new Date().toLocaleTimeString();
    await interaction.reply(`The current time is ${time}`);
  }
});

const PORT = process.env.PORT || 3000; // Use the PORT environment variable or fallback to 3000
app.get("/", (req, res) => {
  res.send("Bot is operational!");
});

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

client.login(process.env.TOKEN);
