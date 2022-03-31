module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    let n = parseInt(db.get(`${message.guild.id}`).find({id: message.guild.id}).value().primo);

    message.channel.send(`Primo já chorou ${n + 1} ${n === 0? "vez" : "vezes"}. Cala a boca Primo!`);

    db.get(`${message.guild.id}`).find({id: message.guild.id}).assign({primo: n + 1}).write();
}