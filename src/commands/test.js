module.exports = function test(message, passed_arguments) {
    var content = passed_arguments[0].join(' '); 
    console.log(content);
    message.channel.send(content);
}