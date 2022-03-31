module.exports.run = async (client, low, FileSync, adapter, db, guild) => {
    db.set(`${guild.id}`, []).write();

    let membros = guild.members.cache;
    db.get(`${guild.id}`).push
    ({
      id: guild.id,
      apelido: 1500,
      cargos: [],
      raids: [{
          nome: "Patrick Thanos", 
          imagem: "https://cdn.glitch.com/685516c9-2952-4b63-bebc-7628cdba95ae%2FPatrick%20Thanos.jpg?v=1588982045840",
          lvl: 3
        }],
      horaraid: "20:30",
      canalraid: guild.systemChannel.id,
      audios: [{
          nome: "xavasca",
          link: "https://cdn.glitch.com/685516c9-2952-4b63-bebc-7628cdba95ae%2Fxavasca.mp3?v=1585509000424"
        }]
    }).write();

    membros.forEach(membro => {
        if(membro.user.bot) return;
        db.get(`${guild.id}`).push
        ({
          id: membro.user.id,
          nome: membro.user.username,
          avatar: membro.user.displayAvatarURL,
          dinheiro: 500,
          diaRecompensa: "Não foi pega"
        }).write(); 
    });
}