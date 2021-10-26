module.exports = function test(message, ...text) {
    const content = text.join(" "); 
    console.log(content);
    message.channel.send(content);
}