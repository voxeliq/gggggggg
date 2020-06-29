const Discord = require("discord.js");



module.exports.run = async (client, message) => {

    const loading = await client.emojis.get("727145408429817957");
    const load = new Discord.RichEmbed()
    .setTitle("Trwa Wysyłanie", loading)
    .setColor("#ff0000")
    .setDescription("Wysyłanie wiadomości na PW... Zazwyczaj to trwa ok. 1-2 sekundy. Jeżeli nadal nie dostałeś wiadomości upewnij się że masz włączoną opcję otrzymywania wiadomości od członków serwerów.")
    .setTimestamp();
    const loaderMSG = await message.channel.send(load);

    const loaded = new Discord.RichEmbed()
    .setAuthor("✔️ Sukces!")
    .setDescription("Wiadomość z informacjami o bocie, została przekazana do ciebie na PW.")
    .setColor("#ffb300")
    .setTimestamp();

    setTimeout(function () {
        loaderMSG.edit(loaded);
    }, 2500);

    let wLini = true;
    let userIcon = client.user.displayAvatarURL;
    let usersSize = client.users.size;
    let channelSize = client.channels.size;
    let uptime = client.uptime;
    let guildSize = client.guilds.size;

    let botinfoembed = new Discord.RichEmbed()
    .setColor("#40E0D0")
    .setThumbnail(userIcon)
    .addField("Nazwa bota:", client.user.username, wLini)
    .addField("Prefix:", "%", wLini)
    .addField("Gildie:", `🛡 ${guildSize}`, wLini) 
    .addField("Kanały", `📁 ${channelSize}`, wLini)
    .addField("Użytkownicy", ` ${usersSize}`, wLini)
    .addField("Biblioteka bota", "Discord.js", wLini)
    .addField("Stworzony:", client.user.createdAt, wLini)
    .addField("Uptime:", `${uptime} ms`, wLini)
    .setTimestamp();
    
    let autor = message.author;
    autor.send(botinfoembed)

}

module.exports.help = {
    name: "Binfo",

}