const InvalidUsageError = require("../exceptions/invalid_usage");

module.exports = async function test(_, message, ...text) {
    const content = text.join(" "); 
    if (content == "") throw new InvalidUsageError("Missing or invalid arguments.");

    message.channel.send(content);
}