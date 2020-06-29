const Discord = require("discord.js");


module.exports.run = async (_client, message, args) => {
    
    let bUserErrEmbed = new Discord.RichEmbed()
    .setTitle("Wystąpił błąd.", message.author.iconURL)
    .setColor("#FF0000")
    .setDescription("Nie możesz wykonać tej interakcji, ponieważ ma za wysokie uprawnienia lub nie ma go na serwerze")
    .setThumbnail(message.guild.iconURL)
    .setFooter("Błąd użytkownika!")
    .setTimestamp();

    
    let bUser = message.guild.member(message.mentions.users.first());
    
    let bPermErr = new Discord.RichEmbed()
    .setTitle("❌ Brak Permisji! ❌", message.author.iconURL)
    .setColor("#FF0000")
    .setDescription("Brakuje ci uprawnienia `KICK_MEMBERS`, aby zbanować "+ bUser)
    .setTimestamp();
    
    
    if(!bUser) return message.channel.send(bUserErrEmbed)
    let bReason = args.join(" ").slice(22);
    
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(bPermErr)
    if(bUser.hasPermission("KICK_MEMBERS")) return message.channel.send(bUserErrEmbed);
    
    
    let bSucces = new Discord.RichEmbed()
    .setColor("#40E0D0")
    .addField("Kickujący:", message.author.username, true)
    .addField("Zkickowany:", bUser,true)
    .addField("Zkickowany za:", bReason, true)
    .addField("Zkickowany o:", message.createdAt,false)
    .setTitle("Kickowanie użytkowników")
    .setTimestamp();
    message.guild.member(bUser).kick(bReason);
    message.channel.send(bSucces)


}

module.exports.help = {
    name: "kick",

}