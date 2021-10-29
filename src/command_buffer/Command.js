module.exports = function Command(command, description) {
    this.name = command.name;
    this.description = description;
    this.execute = command;

    /// Returns parameters of the executed command
    this.get_arguments = () => {
        const args = this.execute.toString().match(/function\s.*?\(([^)]*)\)/)[1];
 
        return args.split(',').map(function(arg) {
            return arg.replace(/\/\*.*\*\//, '').trim();
        }).filter(function(arg) {
            if (arg == "message") return false;
            if (arg == "_") return false;
            if (arg == "command_buffer") return false;

            return true;
        });
    }

    /// Returns the correct usage of the executed command
    this.get_usage = () => {
        const args = this.get_arguments().map(function(arg) { 
            return arg.replace(arg, `<${arg}>`);  // TODO: Change the way the argument is presented depending on stuff, such as its type or it being optional.
        }).join(`, `).replace("...", "");

        return `!${this.name}: ${args}`;
    }
}