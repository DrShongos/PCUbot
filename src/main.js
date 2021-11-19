const { Client, Intents } = require("discord.js");
const mongoose = require("mongoose");
const { token, mongodb, prefix } = require("../config.json");

const CommandSystem = require("./command_system/CommandSystem");

// Commands
const test = require("./commands/test");
const rep = require("./commands/repeat");
const help = require("./commands/help");
const setrole = require("./commands/setrole");

const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]});
const command_system = new CommandSystem(prefix);

client.once("ready", async () => {
    try {
        console.log("Initializing bot...");

        await mongoose.connect(mongodb, { useNewUrlParser: true, keepAlive: true });
        mongoose.set("debug", true);
        console.log("Connected to MongoDB database!");

        command_system.register_command(test, "Repeats the provided message.");
        command_system.register_command(rep, "Repeats the provided message a specified amount of times.");
        command_system.register_command(help, "Shows this message.");
        command_system.register_command(setrole, "Sets a role's priority to be removed. Set priority '0' or dont set any to remove role.");

        console.log("Registered all commands!");
        console.log("Bot is ready to use!");    
    } catch(e) {
        console.log(e);
    }
    
});

client.on("messageCreate", async (message) => {
    if (message.author == client.user) return;
    
    if (message.content.startsWith(command_system.prefix)) {
        const args = message.content.replace(command_system.prefix, '').split(" ");
        const command = args.shift();

        command_system.execute(command, message, ...args);
    }
    
})

client.login(token);