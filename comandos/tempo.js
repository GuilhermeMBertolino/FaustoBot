module.exports.run = async ({client, message, args}) => {
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    hours %= 24;
    let minutes = Math.floor(totalSeconds / 60);
    minutes %= 60;
    totalSeconds = parseInt(totalSeconds % 60);

    let uptime = `${days} dias, ${hours} horas, ${minutes} minuto(s) e ${totalSeconds} segundos`;
    
    message.channel.send(`faz ${uptime} desde que acordei`);
}