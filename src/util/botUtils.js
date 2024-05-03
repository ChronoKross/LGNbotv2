// botUtils.js
const { Routes } = require("discord.js");
const listEvents = require("./listEvents");

async function registerGlobalCommands(rest, commands) {
  try {
    console.log("Started refreshing application (/) commands globally.");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("Successfully reloaded application (/) commands globally.");
  } catch (error) {
    console.error(error);
  }
}

function setupEventListeners(client) {
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    console.log("Hello TDW");

    if (commandName === "listevents") {
      await interaction.reply(`${listEvents()}`);
    }

    if (commandName === "ping") {
      await interaction.reply("Pong!");
    } else if (commandName == "listevents") {
      await interaction.reply(listEvents());
    } else if (commandName === "hello") {
      await interaction.reply("Hello World!");
    } else if (commandName === "lgn") {
      await interaction.reply("LGN is #1!");
    } else if (commandName === "whattimeisit") {
      const time = new Date().toLocaleTimeString();
      await interaction.reply(`The current time is ${time}`);
    }
  });
}

module.exports = { registerGlobalCommands, setupEventListeners };
