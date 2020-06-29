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
    .setDescription("Brakuje ci uprawnienia `BAN_MEMBERS`, aby zbanować "+ bUser)
    .setTimestamp();
    
    
    if(!bUser) return message.channel.send(bUserErrEmbed)
    let bReason = args.join(" ").slice(22);
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(bPermErr)
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send(bUserErrEmbed);
    
    
    let bSucces = new Discord.RichEmbed()
    .setColor("#00FF00")
    .addField("Banujący:", message.author.username, true)
    .addField("Zbanowany:", bUser,true)
    .addField("Zbanowany za:", bReason, true)
    .addField("Zbanowany o:", message.createdAt,false)
    .setTitle("Banowanie użytkowników")
    .setTimestamp();
    message.guild.member(bUser).ban(bReason);
    message.channel.send(bSucces)


}

module.exports.help = {
    name: "ban",

}