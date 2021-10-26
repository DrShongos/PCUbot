const { Client, Intents } = require("discord.js");
const { token } = require("../config.json");

const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]});

client.once("ready", () => {
    console.log("Bot loaded");
});

client.on("messageCreate", (message) => {
    if (message.author == client.user) {
        return;
    }

    message.channel.send("ez");
    
})

client.login(token);