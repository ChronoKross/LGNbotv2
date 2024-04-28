const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");

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

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
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
  }
});

console;

client.login(token);
