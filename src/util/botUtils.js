const { Routes } = require("discord.js");
const listEvents = require("./listEvents");
const createGoogleAuth = require("./googleAuth"); // Import createGoogleAuth if not already imported

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

async function setupEventListeners(client) {
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "listevents") {
      try {
        const authClient = await createGoogleAuth();
        const calendarId =
          "d7609d4dbe74ca9bebf73103a660889b0149c3585d3445d0e8e167f4430a6906@group.calendar.google.com"; // Replace with your calendar ID
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
    } else if (commandName === "ping") {
      await interaction.reply("Pong!");
    } else if (commandName === "hello") {
      await interaction.reply("Hello World!");
    } else if (commandName === "lgn") {
      await interaction.reply("LGN is #1!");
    } else if (commandName === "getcalendar") {
      await interaction.reply(
        "To add events to the calendar, use this link: https://calendar.google.com/calendar/u/0?cid=ZDc2MDlkNGRiZTc0Y2E5YmViZjczMTAzYTY2MDg4OWIwMTQ5YzM1ODVkMzQ0NWQwZThlMTY3ZjQ0MzBhNjkwNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
      );
    } else if (commandName === "whattimeisit") {
      const time = new Date().toLocaleTimeString();
      await interaction.reply(`The current time is ${time}`);
    }
  });
}

module.exports = { registerGlobalCommands, setupEventListeners };
