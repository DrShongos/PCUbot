const { MessageEmbed } = require("discord.js");
const CommandBuffer = require("../command_buffer/CommandBuffer");
const Command = require("../command_buffer/Command");
const InvalidUsageError = require("../exceptions/invalid_usage");

module.exports = function help(command_buffer, message, command_name) {
    var help_string;
    if (command_name != undefined) {
        const command = command_buffer.buffer_storage[command_name];
        help_string = `\`${command.get_usage()}\` - **${command.description}**`;
    } else {
        const tmp = [];
        for (const key in command_buffer.buffer_storage) {
            const command = command_buffer.buffer_storage[key];
            tmp.push(`\`${command.get_usage()}\` - **${command.description}**`);
        };
        help_string = tmp.join("\n");
    }
    
    message.channel.send(help_string);
}