const { Client, Intents } = require("discord.js");
const { token, prefix } = require("../config.json");
const CommandBuffer = require("./command_buffer/CommandBuffer");

// Commands
const test = require("./commands/test");

const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]});
const command_buffer = new CommandBuffer(prefix);

client.once("ready", () => {
    console.log("Bot loaded");
    command_buffer.register_command(test);
    console.log("Registered all commands!");
});

client.on("messageCreate", (message) => {
    if (message.author == client.user) {
        return;
    }

    if (message.content.startsWith(command_buffer.prefix)) {
        var content = message.content.replace(command_buffer.prefix, '').split(" ");
        const command = content.shift();

        command_buffer.process(command, message, content);
    }
    
})

client.login(token);