module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    let nickname = message.content.split(" ").slice(2).join(" ");
    const usuario = message.mentions.members.first();
    const configs = (db.get(`${message.guild.id}`).find({id: message.guild.id}).value());
    const cost = parseInt(configs.apelido);

    let conta = db.get(`${message.guild.id}`).find({id: message.author.id}).value();
    if(conta.dinheiro >= cost)
    {
        usuario.setNickname(nickname);
        db.get(`${message.guild.id}`).find({id: message.author.id}).assign({dinheiro: conta.dinheiro - cost}).write();
        message.reply(`Apelido alterado! foram ${cost} FaustoCoins`);
    }
    else  message.reply("Você não possui FaustoCoins suficientes.");
}