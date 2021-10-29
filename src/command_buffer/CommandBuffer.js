const Command = require("./Command");
const InvalidUsageError = require("../exceptions/invalid_usage");

module.exports = function CommandBuffer(prefix) {
    this.buffer_storage = [];
    this.prefix = prefix;

    /// Adds a command to the command registry.
    this.register_command = (command, description) => {
        const new_command = new Command(command, description);
        this.buffer_storage[new_command.name] = new_command; 
    }

    /// Executes a command based on it's name.
    /// Every word divided by whitespace after calling the command is passed as a separate argument for the command.
    /// They can be used afterwards as separate function parameters (make sure to specify in correct order),
    /// or they can be collected by a rest parameter (or both at the same time).
    this.execute = (command_name, message, ...args) => {
        const command = this.buffer_storage[command_name];
        try {
            command.execute(this, message, ...args);
        } 
        catch(error) {
            if (error instanceof InvalidUsageError) {
                message.channel.send(`Invalid command usage: ${error.message} \n` + "`" + command.get_usage() + "`");
            }
        }
    }

    /// Checks whether the command is present within the buffer storage.
    this.exists = (command) => this.buffer_storage.includes(command.name);

}