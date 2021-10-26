module.exports = function CommandBuffer(prefix) {
    this.buffer_storage = [];
    this.prefix = prefix;

    /// Adds a command to the command registry.
    this.register_command = (command) => {
        this.buffer_storage[command.name] = command; 
    }

    this.process = (command_name, message, ...args) => {
        const command = this.buffer_storage[command_name];

        try {
            command(message, ...args);
        } catch(error) {
            // TODO: Handle errors in a much better way
            console.log("ERROR: Command '" + command_name + "' not found!");
            console.log(error)
        }
    }
}