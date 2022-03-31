const Jimp = require("jimp");

module.exports.run = async ({Discord, client, message, args}) => {
    let fonte = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    let fundo = await Jimp.read("https://cdn.glitch.com/685516c9-2952-4b63-bebc-7628cdba95ae%2FbandeiraGay.png?v=1587129311626");
    let usuario = message.mentions.users.first() || message.author;
    let avatar;
    avatar = await Jimp.read(usuario.displayAvatarURL().replace("webp", "jpg"));

    fundo.print(fonte, 50, 68, `${usuario.username} é ${Math.floor((Math.random() * 101))} % gay`);
    avatar.resize(60, 60);
    fundo.composite(avatar, 0, 0).write("gayComando.png");
    message.channel.send(``, {files: ["gayComando.png"]});
} 