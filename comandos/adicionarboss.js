module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    if(!args[0] || !args[1] || !args[2]) return message.reply("Estão faltando argumentos! Siga o exemplo para usar o comando: **!adicionarboss <nome do boss> <link da imagem> <nível do boss>.**");
    if(!(/(jpg|jpeg|gif|png)$/i.test(args[1]))) return message.reply("O link inserido é invalido.");
    if(isNaN(args[2]) || args[2] < 1 || args[2] > 5) return message.reply("O nível do boss deve ser um número entre 1 e 5");

    let nomeBoss = args[0];
    let bossURL = args[1];
    let nivelBoss = args[2];
    let configs = db.get(`${message.guild.id}`).find({id: message.guild.id}).value();
    let bosses = configs.raids;
    let nomeBosses = [];
    for(let i = 0; i < bosses.length; i++) { nomeBosses.push(bosses[i].nome); }
    if(nomeBosses.indexOf(nomeBoss) !== -1) return message.reply("Esse boss já foi inserido");

    bosses.push({nome: nomeBoss, imagem: bossURL, lvl: nivelBoss});
    db.get(`${message.guild.id}`).find({id: message.guild.id}).assign({raids: bosses}).write();
    message.reply("Boss adicionado!");
}