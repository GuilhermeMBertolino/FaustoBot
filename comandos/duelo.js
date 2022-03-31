const { MessageEmbed } = require("discord.js");

module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    const oponente = message.mentions.users.first();
    
    if(!args[0] || (isNaN(args[0]) && args[0] != "tudo")) return message.reply("Você precisa inserir o número de FaustoCoins.");
    if(args[0] < 0) return message.reply("O número deve ser positivo!");
    
    let contaD = db.get(`${message.guild.id}`).find({id: message.author.id}).value();
    let contaO = db.get(`${message.guild.id}`).find({id: oponente.id}).value();
    let n = (args[0] === "tudo"? contaD.dinheiro : parseInt(args[0]));
      
    if(contaD.dinheiro >= n && contaO.dinheiro >= n)
    {
        const emojis = ["⚔"];
        let dueloI = new MessageEmbed()
          .setTitle("**Duelo**")
          .setDescription(`${message.author.username} X ${oponente.username}, valendo ${n} FaustoCoins`)
          .addField("Reaja com '⚔' para aceitar...", "Esperando resposta", true)
          .setThumbnail("https://i.imgur.com/fHcpGRg.jpg")
          .setColor("#FF0000");
        const m = await message.channel.send(dueloI);
        
        const opt = await reactionMessages(m, oponente, 30, emojis);
        
        if(opt === "⚔")
        {
          let resultado = Math.floor((Math.random() * 2));
          if(resultado === 0)
          {
            let dueloF = new MessageEmbed()
              .setTitle(`**${message.author.username}** venceu!`)
              .setColor("#00FF7F");
            m.edit(dueloF);
            db.get(`${message.guild.id}`).find({id: message.author.id}).assign({dinheiro: contaD.dinheiro + n}).write();
            db.get(`${message.guild.id}`).find({id: oponente.id}).assign({dinheiro: contaO.dinheiro - n}).write();
          }
          else if(resultado === 1)
          {
            let dueloF = new MessageEmbed()
              .setTitle(`**${oponente.username}** venceu!`)
              .setColor("#00FF7F");
            m.edit(dueloF);
            db.get(`${message.guild.id}`).find({id: message.author.id}).assign({dinheiro: contaD.dinheiro - n}).write();
            db.get(`${message.guild.id}`).find({id: oponente.id}).assign({dinheiro: contaO.dinheiro + n}).write();
          }         
        }
      }
      else if(contaD.dinheiro < n) message.reply("Você não pode apostar mais FaustoCoins do que você tem!");
      else if(contaO.dinheiro < n) message.reply(`${oponente.username} não tem tantas FaustoCoins.`);
}

async function reactionMessages(message, author, time, validReactions) {
    time *= 1000;

for (const reaction of validReactions) await message.react(reaction);
const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
return message
  .awaitReactions(filter, {max: 1, time: time})
  .then(collected => collected.first() && collected.first().emoji.name);
}