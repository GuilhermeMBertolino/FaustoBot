const { MessageEmbed } = require("discord.js");

module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Você não tem permissão para usar esse comando!");
    if(!args[0] || !args[1]) return message.reply("Estão faltando argumentos! Siga o exemplo para usar o comando: **!alterarcusto <item a ser alterado> <novo custo>**");
    if(isNaN(args[1]) || args[1] < 0) return message.reply("Você precisa inserir o novo custo desse item.");

    if(args[0] === "apelido") 
    {
        db.get(`${message.guild.id}`).find({id: message.guild.id}).assign({apelido: args[1]}).write();
        message.reply("Item alterado!");
    }
    else
    {
        let nomeCargo = args[0];
        let custoCargo = args[1];
        let configs = db.get(`${message.guild.id}`).find({id: message.guild.id}).value();
        let cargos = configs.cargos;
        let nomesCargos = [];
        for(let i = 0; i < cargos.length; i++) { nomesCargos.push(cargos[i].nome); }
        if(nomesCargos.indexOf(nomeCargo) === -1) return message.reply(`O item ${nomeCargo} não foi encontrado`);

        cargos[nomesCargos.indexOf(nomeCargo)].custo = custoCargo;
        db.get(`${message.guild.id}`).find({id: message.guild.id}).assign({cargos: cargos}).write();

        let cargosEmbed = new MessageEmbed()
        .setColor("#ADFF2F")
        .setTitle("**Cargos atualizados!**");
        for(let i = 0; i < cargos.length; i++)
        {
            cargosEmbed.addField(`**${cargos[i].nome}**`, `$ ${cargos[i].custo}`, false);
        }
        message.channel.send(cargosEmbed);
        }
}