const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync"); 
const moment = require("moment");
const adapter = new FileSync("banco.json"); 
const db = low(adapter);

client.on("ready", () => {
    console.log("LIGADO");
    client.user.setActivity("snarflengansa");
});

setInterval(() => 
    {
      let guildas = client.guilds.cache;
      guildas.forEach(server => {
        let configs = db.get(`${server.id}`).find({id: server.id}).value();
        if(configs.horaraid === moment().format("H:mm") || configs.horaraid === moment().format("HH:mm")) raid(configs.canalraid, server.id);
      });
    }, 60000);

client.on("message", async message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(" ").slice(1);

    try {
        let commandFile = require(`./comandos/${command}.js`);
        await commandFile.run({Discord, client, message, args, low, FileSync, adapter, db});
    } catch (err) {
        if (err.code === "MODULE_NOT_FOUND") return;
        console.error(err);
    }

})

fs.readdir("./eventos/", (err, files) => {
    if(err) return console.error(err);
    files.forEach(file => {
        const eventName = file.split(".")[0]
        const event = require(`./eventos/${file}`)
        
        client.on(eventName, (...args) => event.run(client, low, FileSync, adapter, db, ...args))
    });
});

client.login(config.token);

async function raid(canalID, serverID)
{
    let canal = client.channels.cache.get(canalID);
    let configs = db.get(`${serverID}`).find({id: serverID}).value();
    let bosses = configs.raids;
    let boss = bosses[Math.floor((Math.random() * bosses.length))];
    let nome = boss.nome;
    let img = boss.imagem;
    let nivel = boss.lvl;
    let custo = nivel * 500;
    let recompensa = nivel * 1500;
    let members = [];

    let embedRaid = new MessageEmbed()
    .setTitle(`Uma raid está acontecendo! Reaja a mensagem com 🔪 para ajudar na luta contra ${nome}! São F$ ${custo} para participar e F$ ${recompensa} como recompensa`)
    .setImage(img)
    .setColor("#8B0000")
    .setFooter("A raid termina em uma hora.");

    const m = await canal.send(embedRaid);
    m.react("🔪");

    client.on('messageReactionAdd', (reaction, user) =>
    {
        if(reaction.message.id !== m.id) return;
        if(reaction.emoji.name !== "🔪") return;
        if(user.id === client.user.id) return;
        if(members.indexOf(user.id) !== -1) return;

        let conta = db.get(`${serverID}`).find({id: user.id}).value();

        if(conta.dinheiro >= custo)
        {
            db.get(`${serverID}`).find({id: user.id}).assign({dinheiro: conta.dinheiro - custo}).write();
            members.push(user.id);
        }
    });

  setTimeout(function()
  {
    let winrate = 60 - (10 * nivel) + (12 * members.length) - (2 * nivel * members.length);
    let result = Math.floor(Math.random() * 101);
    
    if(result < winrate)
    {
      canal.send(`${nome} foi derrotado!`);
      
      for(const userId of members)
      {
        let conta = db.get(`${serverID}`).find({id: userId}).value();
        db.get(`${serverID}`).find({id: userId}).assign({dinheiro: conta.dinheiro + recompensa}).write();
      }
    }
    else if(result >= winrate)
    {
      canal.send(`Vocês não foram páreo para ${nome}.`);
    }
  }, 3600000);
}