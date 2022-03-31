const { MessageEmbed } = require("discord.js");

module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    let configs = db.get(`${message.guild.id}`).find({id: message.guild.id}).value();
    let loja = new MessageEmbed()
    .setTitle("**LOJA**")
    .addField("*utilitários:*", "   ⬇", false)
    .addField("**Alterar Apelido:**", `$ ${configs.apelido}`)
    .addField("*cargos:*", "    ⬇", false)
    .setColor("#00008B");

    configs.cargos.forEach(cargo => {
        loja.addField(`**${cargo.nome}**`, `$ ${cargo.custo}`, false)
    });

    message.channel.send(loja);
}