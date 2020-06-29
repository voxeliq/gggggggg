const Discord = require("discord.js");

module.exports.run = async (_client, message) =>{

    if(!message.guild.afkChannelID){
        message.guild.afkChannelID = "Serwer nie posiada kanału AFK!"
    }

    const infoEmbed = new Discord.RichEmbed()
    .setColor("#40E0D0")
    .setAuthor("Informacje o serwerze " + message.guild.name,message.guild.iconURL)
    .addField("ID Serwera discord", message.guild.id,true)
    .addField("ID Kanału AFK", message.guild.afkChannelID, true)
    .addField("Utworzony", message.guild.createdAt, true)
    .addField("Właściciel serwera", message.guild.owner, true)
    .addField("Ilość członków na serwerze", message.guild.memberCount, true)

    message.channel.send(infoEmbed);
}

module.exports.help = {
    name: "Sinfo"
}