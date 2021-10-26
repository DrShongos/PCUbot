module.exports = function rep(message, contents, times) {
    const content = contents.repeat(times);
    console.log(contents);
    message.channel.send(content);
}