module.exports.run = async ({client, message, args}) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Você não tem permissão para usar esse comando.");
    if(!args[0]) return message.reply("Você precisa inserir o número de mensagens a serem apagadas.");
    if(isNaN(args[0])) return message.reply("Voce precisa inserir um número!");
    if(args[0] < 2 || args[0] > 100) return message.reply("O número de mensagens apagadas deve estar entre 2 e 100.");
      
    let mensagemDeletar = args[0] + 1;
    
    try
    {
      message.channel.bulkDelete(mensagemDeletar)
      message.channel.send(`Chat foi limpo por ${message.author}, ${mensagemDeletar} mensagens foram apagadas`);        
    }
    catch(e)
    {
      console.log(e);
    }
}