const Discord = require("discord.js");
const ms = require("ms");


module.exports.run = async (_client, message, args) => {
    const cLogs = message.guild.channels.find(channel => channel.name === "logi-bota");

    let toMute = message.mentions.members.first();
    let muteRole =  message.guild.roles.find('name', "Wyciszony");
    if(!toMute) return message.reply("Podaj użytkownika do zmutowania!");
    if(toMute.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie moge go zmutować!");

    if(!muteRole){
        try{
            muteRole = await message.guild.createRole({
                name:"Wyciszony",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
               channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })
            })
        }catch(e){
            console.log(e.stack);
        }
    }

    let muteTime = args[1];
    if(!muteTime) return message.reply(`Nie podałeś na ile chcesz zmutować ${toMute}`)

    await(toMute.addRole(muteRole.id));
    message.reply(`<@${toMute.id}> został wyciszony na ${ms(muteTime)}`);
    if(cLogs){
        cLogs.send(`${message.author.username} zmutował <@${toMute.id}> na ${ms(muteTime)}`);
    }else{
        return;
    }

    setTimeout(function(){
        toMute.removeRole(muteRole.id);
        message.channel.send(`<@${toMute.id}> został odmutowany!`)
        if(cLogs){
            cLogs.send(`Użytkownikowi <@${toMute.id}> minął czas wyciszenia!`)
        }else{
            return;
        }
    }, ms(muteTime));

}

module.exports.help = {
    name: "mute",

}