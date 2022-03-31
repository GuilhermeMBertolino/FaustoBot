const { MessageEmbed } = require("discord.js");

module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Você não tem permissão para usar esse comando!");
    if(!args[0]) return message.reply("Você precisa inserir o nome do cargo a ser excluído.");

    let nomeCargo = args[0];
    let configs = db.get(`${message.guild.id}`).find({id: message.guild.id}).value();
    let cargos = configs.cargos;
    let nomesCargos = [];
    for(let i = 0; i < cargos.length; i++) { nomesCargos.push(cargos[i].nome); };
    if(nomesCargos.indexOf(nomeCargo) === -1) return message.reply(`O cargo ${nomeCargo} não foi encontrado.`);
    else cargos.splice(nomesCargos.indexOf(nomeCargo), 1);

    db.get(`${message.guild.id}`).find({id: message.guild.id}).assign({cargos: cargos}).write();

    let cargosEmbed = new MessageEmbed()
    .setColor("#FF4500")
    .setTitle("**Cargos atualizados!**");
    for(let i = 0; i < cargos.length; i++)
    {
        cargosEmbed.addField(`**${cargos[i].nome}**`, `$ ${cargos[i].custo}`, false);
    }
    message.channel.send(cargosEmbed);
}