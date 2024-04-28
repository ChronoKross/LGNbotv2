// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const dotENV = require("dotenv").config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

client.on("messageCreate", (msg) => {
  if (msg.content === "lgn") {
    msg.reply(`Hello ${msg.author.username}, LGN is the GOAT!`);
  }

  client.on("guildCreate", (guild) => {
    console.log(`Joined a new guild: ${guild.name}`);
    // Additional logic can be implemented here
  });
  client.on("messageCreate", (msg) => {
    console.log(`Received message: ${msg.content}`);
    if (msg.content === "lgn") {
      msg.reply(`Hello ${msg.author.username}, LGN is the GOAT!`);
    }
  });
});
