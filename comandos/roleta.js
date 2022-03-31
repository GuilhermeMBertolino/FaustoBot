module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    if(!args[0] || (isNaN(args[0]) && args[0] != "tudo")) return message.reply("Você precisa inserir o número de FaustoCoins.");
    if(args[0] < 0) return message.reply("O número deve ser positivo!");

    let conta = db.get(`${message.guild.id}`).find({id: message.author.id}).value();

    if(conta.dinheiro >= args[0] || args[0] === "tudo")
      {
        let res = Math.floor((Math.random() * 2));
        const n = (args[0] === "tudo"? conta.dinheiro : parseInt(args[0]));
        if(res === 0)
        { 
            db.get(`${message.guild.id}`).find({id: message.author.id}).assign({dinheiro: conta.dinheiro - n}).write();
            message.reply(`Você perdeu ${n} FaustoCoins na roleta! Patético.`);
        }
        else if(res === 1)
        { 
            db.get(`${message.guild.id}`).find({id: message.author.id}).assign({dinheiro: conta.dinheiro + n}).write();
            message.reply(`Você ganhou ${n} FaustoCoins na roleta! 🎉`);
        }
      }
      else
        message.reply("Você não pode apostar mais FaustoCoins do que você tem!")
}