const Discord = require("discord.js");
const superagent = require("superagent");


module.exports.run = async (_client, message) => {

    var channel = message.channel;

    let {body} = await superagent
    .get('https://nekobot.xyz/api/image?type=hneko').catch((err) => {
    channel.send("Błąd z systemem API!");
    return console.log(err);
});

    try {
        let embed = new Discord.RichEmbed()
        .setColor(body.color)
        .setImage(body.message);
        channel.send(embed);
    } catch(err){
        channel.send("Wystąpił błąd z botem!")
        return console.log(err);
    }

}

module.exports.help = {
    name: "Hneko",

}