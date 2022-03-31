const superagent = require("superagent");
const { MessageEmbed } = require("discord.js");

module.exports.run = async ({Discord, client, message, args}) => { 
    let {body} = await superagent.get("https://corona.lmao.ninja/v2/countries/brazil");

    let casos = body.cases;
    let casosHoje = body.todayCases;
    let mortes = body.deaths;
    let mortesHoje = body.todayDeaths;
    let curados = body.recovered;
    let casosAtivos = body.active;
    let casosCriticos = body.critical;

    let coronamap = new MessageEmbed()
    .setTitle("Informções em tempo real do Corona Vírus no Brasil")
    .addField("**Casos Confirmados:**", `**${casos}**`, false)
    .addField("**Casos Confirmados Hoje:**", `**${casosHoje}**`, false)
    .addField("**Mortes:**", `**${mortes}**`, false)
    .addField("**Mortes Hoje:**", `**${mortesHoje}**`, false)
    .addField("**Pessoas Curadas:**", `**${curados}**`, false)
    .addField("**Casos Ativos:**", `**${casosAtivos}**`, false)
    .addField("**Casos Críticos:**", `**${casosCriticos}**`, false)
    .setColor("#FFFF00")

    message.channel.send(coronamap);
}   