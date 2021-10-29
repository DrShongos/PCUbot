const { Client, Intents } = require("discord.js");
const { token, prefix } = require("../config.json");
const CommandBuffer = require("./command_buffer/CommandBuffer");

// Commands
const test = require("./commands/test");
const rep = require("./commands/repeat");
const help = require("./commands/help");

const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]});
const command_buffer = new CommandBuffer(prefix);

client.once("ready", async () => {
    console.log("Initializing bot...");

    command_buffer.register_command(test, "Repeats the provided message.");
    command_buffer.register_command(rep, "Repeats the provided message a specified amount of times.");
    command_buffer.register_command(help, "Shows this message.");

    console.log("Registered all commands!");
    console.log("Bot is ready to use!");
});

client.on("messageCreate", async (message) => {
    if (message.author == client.user) return;
    
    if (message.content.startsWith(command_buffer.prefix)) {
        const args = message.content.replace(command_buffer.prefix, '').split(" ");
        const command = args.shift();

        command_buffer.execute(command, message, ...args);
    }
    
})

client.login(token);