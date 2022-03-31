module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    let nomeAudio = args[0];
    let configs = db.get(`${message.guild.id}`).find({id: message.guild.id}).value();
    let audios = configs.audios;
    let audiosNomes = [];
    for(let i = 0; i < audios.length; i++) { audiosNomes.push(audios[i].nome); }
    if(audiosNomes.indexOf(nomeAudio) === -1) return message.reply("Esse audio não foi encontrado.");

    audios.splice(audiosNomes.indexOf(nomeAudio), 1);
    db.get(`${message.guild.id}`).find({id: message.guild.id}).assign({audios: audios}).write();
    message.reply("Audio removido!");
}