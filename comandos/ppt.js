const { MessageEmbed } = require("discord.js");

module.exports.run = async ({Discord, client, message, args}) => {
   
    const oponente = message.mentions.users.first();
    let PPTembedInicio = new MessageEmbed()
      .setTitle("**Pedra papel tesoura!**")
      .addField(`${message.author.username}`, "Esperando a escolha", true)
      .addField(`${oponente.username}`, "Esperando a escolha", true)
      .setColor("#FF0000")
    
    let PPTembedFim = new MessageEmbed()
      .setTitle("**Pedra papel tesoura!**")
      .setColor("#00FF7F")
    
    const m = await message.channel.send(PPTembedInicio)
    
    const emojis = ["🗻", "📄", "✂"];
    
    const m_autor = await message.author.send("Escolha uma opção.");
    
    const op_autor = await reactionMessages(m_autor, message.author, 30, emojis);
    
    const m_oponente = await oponente.send(`${message.author} te desafiou no **pedra, papel, tesoura**! escolha uma opção.`);
    
    const op_oponente = await reactionMessages(m_oponente, oponente, 30, emojis);
    
    let resultado;

    if(op_autor === op_oponente) resultado = 0; 
    else if((op_autor === "🗻" && op_oponente === "✂") || 
            (op_autor === "📄" && op_oponente === "🗻") || 
            (op_autor === "✂" && op_oponente === "📄")) resultado = 1; 
    else if((op_oponente === "🗻" && op_autor === "✂") || 
            (op_oponente === "📄" && op_autor === "🗻") || 
            (op_oponente === "✂" && op_autor === "📄")) resultado = 2; 
    else resultado = 3; //Erro

    PPTembedFim
      .addField(`${message.author.username}`, `Escolheu ${op_autor}`, true)
      .addField(`${oponente.username}`, `Escolheu ${op_oponente}`, true)
    
    if(resultado === 0)
    {
      PPTembedFim
        .setTitle("**Empate!**");
    }
    else if(resultado === 1)
    {
      PPTembedFim
        .setTitle(`**${message.author.username} venceu!**`);
    }
    else if(resultado === 2)
    {
      PPTembedFim
        .setTitle(`**${oponente.username} venceu! **`);
    }
    m.edit(PPTembedFim);
}

async function reactionMessages(message, author, time, validReactions) {
    time *= 1000;

for (const reaction of validReactions) await message.react(reaction);
const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
return message
  .awaitReactions(filter, {max: 1, time: time})
  .then(collected => collected.first() && collected.first().emoji.name);
}