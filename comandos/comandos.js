const { MessageEmbed } = require("discord.js");

module.exports.run = async ({Discord, client, message, args}) => {
    let paginas = [];
    let pagina = 1;
    const reactions = ["⬅", "➡"];
    paginas[0] = new MessageEmbed()
    .setTitle("Comandos gerais")
    .addField("**!ping: **", "mostra o meu ping", false)
    .addField("**!tempo: **", "mostra o tempo que eu estou online", false)
    .addField("**!limpar <n° de mensagens>: **", "apaga as últimas do canal de texto (somente para moderadores)", false)
    .addField("**!corona: **", "mostra informações do corona no Brasil", false)
    .addField("**!audio <nome>: **", "toca o áudio solicitado no canal de voz em que você se encontra", false)
    .addField("**!textogrande <texto>: **", "envia o texto solicitado em emotes", false)
    .addField("**!caracoroa: **", "joga uma moeda", false)
    .addField("**!ppt <@oponente>: **", "jogo de pedra, papel, tesoura", false)
    .addField("**!gay <@usuário>: **", "te mostra (com precisão) o quão gay o usuário é, se nenhum usuário for fornecido, utiliza quem mandou a mensagem", false)
    .setThumbnail("https://cdn.glitch.com/685516c9-2952-4b63-bebc-7628cdba95ae%2Ffaust%C3%A3o.jpg?v=1585428639891")
    .setColor("#00FF00")
  
    paginas[1] = new MessageEmbed()
    .setTitle("Economia")
    .addField("**!dinheiro: **", "te mostra quantas FaustoCoins você possui", false)
    .addField("**!duelo <@oponente> <qtde de F$>: **", "inicia um duelo valendo FaustoCoins", false)
    .addField("**!roleta <qtde de F$>: **", "aposta FaustoCoins na roleta ( 50% de ganhar e 50% de perder )", false)
    .addField("**!doar <qtde de F$> <@usuario>: **", "dá fausto coins a um usuário", false)
    .addField("**!loja: **", "mostra a loja ( para gastar as FaustoCoins )", false)
    .addField("**!subircargo: **", "gasta suas FaustoCoins e sobe para o próximo cargo no servidor ( ver valores na loja )", false)
    .addField("**!apelido <@usuario> <novo_apelido>: **", "gasta suas FaustoCoins e altera o apelido do usuario", false)
    .addField("**!recompensa**", "a cada 24 horas te dá uma quantidade bônus de FaustoCoins (entre 300 e 1200)", false)
    .setThumbnail("https://cdn.glitch.com/685516c9-2952-4b63-bebc-7628cdba95ae%2Ffaust%C3%A3o.jpg?v=1585428639891")
    .setColor("#00FF00")

    paginas[2] = new MessageEmbed()
    .setTitle("Configurações do servidor")
    .addField("**!adicionaraudio <nome do áudio> <link para arquivo mp3 ou mp4>: **", "adiciona um áudio novo aos áudios tocaveis do servidor", false)
    .addField("**!removeraudio <nome do áudio>: **", "remove um dos áudios do servidor", false)
    .addField("**!adicionarcargo <nome do cargo> <preço para subir de cargo> <posição do novo cargo>: **", "adiciona o cargo ao sistema de economia do servidor", false)
    .addField("**!removercargo <nome do cargo>: **", "remove um cargo do sistema de economia do servidor", false)
    .addField("**!adicionarboss <nome do boss> <link para imagem .jpg, .png ou .gif>: **", "adiciona um boss para as raids do servidor",false)
    .addField("**!removerboss <nome do boss>: **", "remove um boss das raids do servidor", false)
    .addField("**!horaraid <horário no formato hh:mm (*17:35*)>**", "altera o horário em que as raids ocorrem",false)
    .addField("**!alterarcusto <item a ser alterado> <novo custo>: **", "altera o custo de um item do servidor", false)
    .setThumbnail("https://cdn.glitch.com/685516c9-2952-4b63-bebc-7628cdba95ae%2Ffaust%C3%A3o.jpg?v=1585428639891")
    .setColor("#00FF00")
  
    for(let i = 0; i < paginas.length; i++)
    {
      paginas[i].setFooter(`Página ${i + 1} de ${paginas.length}`);
    }
    
    const comandos = await message.channel.send(paginas[0])
    comandos.react("⬅").then(() => comandos.react("➡"));
    
    const filtroAvanca = (reaction, user) => reaction.emoji.name === "➡" && user.id === message.author.id;
    const filtroVolta = (reaction, user) => reaction.emoji.name === "⬅" && user.id === message.author.id;
  
    const avanca = comandos.createReactionCollector(filtroAvanca, {time: 60000});
    const volta = comandos.createReactionCollector(filtroVolta, {time: 60000});
  
    volta.on('collect', r => 
    {
      if (pagina === 1) return;
      pagina --;
      
      comandos.edit(paginas[pagina - 1]);
    });
    avanca.on('collect', r =>
    {
      if(pagina === paginas.length) return;
      pagina ++;
      
      comandos.edit(paginas[pagina - 1]);
    });
}