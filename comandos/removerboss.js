module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Você não tem permissão para usar esse comando!");
    let nomeBoss = args.join(" ");
    let configs = db.get(`${message.guild.id}`).find({id: message.guild.id}).value();
    let bosses = configs.raids;
    let nomeBosses = [];
    for(let i = 0; i < bosses.length; i++) { nomeBosses.push(bosses[i].nome); }
    if(nomeBosses.indexOf(nomeBoss) === -1) return message.reply("Esse boss não foi encontrado.");

    bosses.splice(nomeBosses.indexOf(nomeBoss), 1);
    db.get(`${message.guild.id}`).find({id: message.guild.id}).assign({raids: bosses}).write();
    message.reply("Boss removido!");
}