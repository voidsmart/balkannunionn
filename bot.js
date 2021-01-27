var Discord = require("discord.js");
var prefix = "/";
var client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot je online!");
  client.user.setActivity(`discord.gg/6sCuCxupBe`)
});

var bannedwords = "fuck,shit,slut,whore,picka,jebem,mamu,kurac,sisa,nigga,ni.gga,ni.gga,niga,nigger,nig.ger".split(",");

client.on("message", msg => {
  if (msg.guild === null) return;

  for (i=0;i<bannedwords.length;i++) {
    if (msg.content.toLowerCase().includes(bannedwords[i])) {
      msg.delete();
      msg.reply("Molim vas, ne koristite takve rijeci.");
      return;
    }
  }

  if (msg.author.bot) return;
  if (!msg.member.hasPermission("ADMINISTRATOR")) return;

  if (!msg.content.toLowerCase().startsWith(prefix)) return;
  msg.delete();
  if (msg.content.toLowerCase().startsWith(prefix + "kick ")) {
    var mem = msg.mentions.members.first();
    mem.kick().then(() => {
      msg.channel.send(mem.displayName + " je uspjesno kickan " + msg.author.username + "!");
    }).catch(e => {
      msg.channel.send("Desila se greska!");
    });
  }
  if (msg.content.toLowerCase().startsWith(prefix + "ban ")) {
    var mem = msg.mentions.members.first();
    var mc = msg.content.split(" ")[2];
    mem.ban(mc).then(() => {
      msg.channel.send(mem.displayName + " je uspjesno banan " + msg.author.username + " za " + mc + " dana!");
    }).catch(e => {
      msg.channel.send("Desila se greska!");
    });
  }
  if (msg.content.toLowerCase().startsWith(prefix + "mute")) {
    var mem = msg.mentions.members.first();
    if (msg.guild.roles.find("name", "Muted")) {
      mem.addRole(msg.guild.roles.find("name", "Muted")).then(() => {
        msg.channel.send(mem.displayName + " je uspjesno mutan!");
      }).catch(e => {
        msg.channel.send("Desila se greska!");
        console.log(e);
      });

    }
  }
  if (msg.content.toLowerCase().startsWith(prefix + "unmute")) {
    var mem = msg.mentions.members.first();
    if (msg.guild.roles.find("name", "Muted")) {
      mem.removeRole(msg.guild.roles.find("name", "Muted")).then(() => {
        msg.channel.send(mem.displayName + " je uspjesno unmutan");
      }).catch(e => {
        msg.channel.send("Desila se greska!");
        console.log(e);
      });

    }
  }
  if (msg.content.toLowerCase().startsWith(prefix + "purge")) {
    var mc = msg.content.split(" ")[1];
    msg.channel.bulkDelete(mc);
  }
  if (msg.content.toLowerCase().startsWith(prefix + "eval")) {
    var sc = msg.content.substring(msg.content.indexOf(" "));
    eval(sc);
  }
  if (msg.content.toLowerCase().startsWith(prefix + "calc")) {
    var ca = msg.content.substring(msg.content.indexOf(" "));
    msg.reply(ca + " is " + eval(ca).toFixed(2));
  }
});

client.login(process.env.TOKEN);
