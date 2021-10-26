module.exports = class CommandBuffer {
    #_buffer_storage; // TODO: Make the storage buffer store descriptions
    prefix;

    constructor(prefix) {
        this.#_buffer_storage = [];
        this.prefix = prefix;
    }

    /// Adds a command to the command registry.
    register_command(command) {
        this.#_buffer_storage[command.name] = command; 
    }

    process(command_name, message, ...args) {
        var command = this.#_buffer_storage[command_name];

        try {
            command(message, args);
        } catch(error) {
            // TODO: Handle errors in a much better way
            console.log("ERROR: Command '" + command_name + "' not found!");
            console.log(error)
        }
    }
}