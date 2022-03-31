const { MessageEmbed } = require("discord.js");

module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Você não tem permissão para usar esse comando!");
    if(!args[0] || !args[1] || !args[2]) return message.reply("Estão faltando argumentos! Siga o exemplo para usar o comando: **!adicionarcargo <nome do cargo> <preço para subir de cargo> <posição do cargo>.**");
    if(isNaN(args[1]) || args[1] < 0) return message.reply("Você precisa inserir o preço de alcançar esse cargo.");
    if(isNaN(args[2]) || args[2] < 1) return message.reply("Você precisa inserir a posição do cargo.");

    let nomeCargo = args[0];
    let custoCargo = args[1];
    let posCargo = args[2];
    let configs = db.get(`${message.guild.id}`).find({id: message.guild.id}).value();
    let cargos = configs.cargos;
    let nomesCargos = [];
    for(let i = 0; i < cargos.length; i++) { nomesCargos.push(cargos[i].nome); }
    if(nomesCargos.includes(nomeCargo)) return message.reply("Esse cargo já foi adicionado. Para alterá-lo utilize **!alterarcargo**");
    let cargosS = message.guild.roles.cache;
    let nc;
    cargosS.forEach(cargo => {
        if(cargo.name !== nomeCargo) return;

        nc = {nome: nomeCargo, id: cargo.id, custo: custoCargo};
        cargos.splice(posCargo - 1, 0, nc);
        db.get(`${message.guild.id}`).find({id: message.guild.id}).assign({cargos: cargos}).write();
    });
    if(!nc) return message.reply(`O cargo ${args[0]} não foi encontrado.`);
    let cargosEmbed = new MessageEmbed()
    .setColor("#008B8B")
    .setTitle("**Cargos atualizados!**");
    for(let i = 0; i < cargos.length; i++)
    {
        cargosEmbed.addField(`**${cargos[i].nome}**`, `$ ${cargos[i].custo}`, false);
    }
    message.channel.send(cargosEmbed);
}