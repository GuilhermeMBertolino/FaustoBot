module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Você não tem permissão para usar esse comando!");
    if(!args[0]) return message.reply("Você precisa inserir o horário em que as raids acontecem!");
    let tempo = args[0].split(":");
    if(!tempo[0] || !tempo[1]) return message.reply("Insira um horário no formato **h:mm**, segue exemplos: **17:34, 9:55**.");
    if(isNaN(tempo[0]) || tempo[0] < 0 || tempo[0] > 23) return message.reply("Hora inválida!");
    if(isNaN(tempo[1]) || tempo[1] < 0 || tempo[1] > 59) return message.reply("Minutos inválidos!");
    
    db.get(`${message.guild.id}`).find({id: message.guild.id}).assign({horaraid: args[0]}).write();

    message.reply("Horário alterado!");
}