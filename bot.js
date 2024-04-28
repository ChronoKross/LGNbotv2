// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const dotENV = require("dotenv").config();
const express = require("express"); // Import Express

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

// Set up an Express application
const app = express();
const PORT = process.env.PORT || 3000; // Set the port to listen on

// Define routes for your Express application
app.get("/", (req, res) => {
  res.send("Hello from your bot's web server!");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Event listener for when the bot joins a new guild
client.on("guildCreate", (guild) => {
  console.log(`Joined a new guild: ${guild.name}`);
});

// Event listener for creating messages
client.on("messageCreate", (msg) => {
  if (msg.content === "lgn") {
    msg.reply(`Hello ${msg.author.username}, LGN is the GOAT!`);
  }
  console.log(`Received message: ${msg.content}`);
});
