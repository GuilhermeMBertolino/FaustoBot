module.exports.run = async ({Discord, client, message, args}) => {
    let output = args.join(' ');
    if (!output)
      return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Faltou o texto")
        .setColor("#FF0000"));
  
    let bigtext_arr = new Array();
    for (let i = 0; i < output.length; i++) 
    {
      let isnumber = await parseInt(output[i]);
      if (isnumber >= 0 && isnumber <= 9)
        bigtext_arr.push(`:${numConv.toWords(output[i])}:`)
      else 
      {
        if (output[i] !== ' ') 
        {
          if (!output[i].match(/^[a-zA-Z]+$/)) 
            bigtext_arr.push(`:question:`)
          else
            bigtext_arr.push(`:regional_indicator_${output[i].toLowerCase()}:`)
        } 
        else bigtext_arr.push('   ');
      }
    }
  
    try 
    {
      await message.channel.send(bigtext_arr.join(''));
      return message.delete()
    } 
    catch (e) 
    {
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('Ocorreu um erro ao enviar a mensagem.')
      .setColor('#FF0000'));
    }
}