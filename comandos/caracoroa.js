const { MessageEmbed } = require("discord.js");

module.exports.run = async ({Discord, client, message, args}) => {
    let replies = ["Cara !", "Coroa !" ]
    const cara = 'http://www.moedasdobrasil.com.br/moedas/images/moedas1/A00007A.JPG'
    const coroa = 'http://www.moedasdobrasil.com.br/moedas/images/moedas1/R00007A.JPG'

      
    let result = Math.floor((Math.random() * replies.length)); 

    let dadoembed = new MessageEmbed()
      .setFooter(message.author.tag, message.author.displayAvatarURL)
      .setThumbnail(message.author.avatarURL)
      .setColor('#00FF00') 
      .addField("O resultado é:", replies[result])
    if(replies[result] === 'Coroa !') 
    {
      dadoembed.setImage(coroa)
    }
    else if(replies[result] === 'Cara !') 
    {
      dadoembed.setImage(cara)
    }
    message.channel.send(dadoembed);
}