module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    const usuario = message.mentions.users.first();
    
    if(!args[0] || (isNaN(args[0]) && args[0] != "tudo")) return message.reply("Você precisa inserir o número de FaustoCoins.");
    if(args[0] < 0) return message.reply("O número deve ser positivo!");
    if(usuario.id === client.user.id) return message.reply("Muito gentil da sua parte, mas eu não possuo uma conta.");
    
    let contaD = db.get(`${message.guild.id}`).find({id: message.author.id}).value();
    let contaU = db.get(`${message.guild.id}`).find({id: usuario.id}).value();
    let dinheiro = args[0] === "tudo" ? contaD.dinheiro : parseInt(args[0]);
      
    if(contaD.dinheiro >= dinheiro)
    {
        db.get(`${message.guild.id}`).find({id: usuario.id}).assign({dinheiro: contaU.dinheiro + dinheiro}).write();
        db.get(`${message.guild.id}`).find({id: message.author.id}).assign({dinheiro: contaD.dinheiro - dinheiro}).write();
        message.reply("Doação Concluída!");
    }
    else message.reply("Você não pode doar mais FaustoCoins do que você tem!");
}