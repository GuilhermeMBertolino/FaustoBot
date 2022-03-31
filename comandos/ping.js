module.exports.run = async ({client, message, args}) => {
  const m = await message.channel.send("Ping?");
      m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A latência da API é ${Math.round(client.ws.ping)}ms`);    
  }
