const { MessageEmbed } = require("discord.js");
const CommandSystem = require("../command_system/CommandSystem");
const Command = require("../command_system/Command");
const InvalidUsageError = require("../exceptions/invalid_usage");

module.exports = async function help(command_system, message, command_name) {
    var help_string;
    if (command_name != undefined) {
        const command = command_system.command_storage[command_name];
        help_string = `\`${command.get_usage()}\` - **${command.description}**`;
    } else {
        const tmp = [];
        for (const key in command_system.command_storage) {
            const command = command_system.command_storage[key];
            tmp.push(`\`${command.get_usage()}\` - **${command.description}**`);
        };
        help_string = tmp.join("\n");
    }
    
    message.channel.send(help_string);
}