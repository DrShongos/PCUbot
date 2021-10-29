const InvalidUsageError = require("../exceptions/invalid_usage");

module.exports = function rep(_, message, times, ...contents) {
    const content = contents.join(" ").repeat(times);
    if (content == "") throw new InvalidUsageError("Missing or invalid arguments.");

    message.channel.send(content);
}