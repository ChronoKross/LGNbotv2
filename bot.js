const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "hello",
    description: "Replies with Hello World!",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// Register commands globally instead of a specific guild
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

  if (commandName === "ping".toLowerCase()) {
    // This conversion is redundant as commandName is already processed to match exactly
    await interaction.reply("Pong!");
  } else if (commandName === "hello") {
    await interaction.reply("Hello World!");
  }
});

client.login(process.env.TOKEN);
