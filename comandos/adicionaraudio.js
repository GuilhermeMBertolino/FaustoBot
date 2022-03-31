module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    if(!args[0] || !args[1]) return message.reply("Estão faltando argumentos. Siga o exemplo de uso: **!adicionaraudio <nome do áudio> <link do audio>**");
    if(!(/(mp3|mp4)$/i.test(args[1]))) return message.reply("O link inserido é invalido.");

    let configs = db.get(`${message.guild.id}`).find({id: message.guild.id}).value();
    let audios = configs.audios;
    let audiosNomes = [];
    audios.forEach(audio => {
        audiosNomes.push(audio.nome);
    });
    if(audiosNomes.indexOf(args[0]) !== -1) return message.reply("Um audio com esse nome já foi inserido");

    audios.push({nome: args[0], link: args[1]});
    message.reply("Áudio adicionado!");
}