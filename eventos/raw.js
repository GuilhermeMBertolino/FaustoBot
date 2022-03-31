module.exports.run = async (client, low, FileSync, adapter, db, event) => {

    let cargos = {valorant: "765559923609829396", 
                  cinema: "765560133895716874", 
                  among_us: "765560178266865666",
                  rocket_league: "765560261200969748",
                  lol: "765560315978186783",
                  cs: "765560364938297364",
                  hearthstone: "765990980133847101"}
    let emojis = {valorant: "764535456314425404",
                  hearthstone: "765991477729558558",
                  cs: "765991547988213801",
                  lol: "765991503461613589"}
    
    if(event.t !== "MESSAGE_REACTION_ADD" && event.t !== "MESSAGE_REACTION_REMOVE") return;
    if(event.d.message_id !== "766063353125929001") return;

    let server = client.guilds.cache.get(event.d.guild_id);
    let membro = server.members.cache.get(event.d.user_id);

    if(event.t === "MESSAGE_REACTION_ADD") 
    {
        if(event.d.emoji.name === "🔪") membro.roles.add(cargos.among_us);
        else if(event.d.emoji.id === emojis.hearthstone) membro.roles.add(cargos.hearthstone);
        else if(event.d.emoji.name === "🍿") membro.roles.add(cargos.cinema);
        else if(event.d.emoji.name === "🚙") membro.roles.add(cargos.rocket_league);
        else if(event.d.emoji.id === emojis.cs) membro.roles.add(cargos.cs);
        else if(event.d.emoji.id === emojis.lol) membro.roles.add(cargos.lol);
        else if(event.d.emoji.id === emojis.valorant) membro.roles.add(cargos.valorant);
    }
    if(event.t === "MESSAGE_REACTION_REMOVE")
    {
        if(event.d.emoji.name === "🔪") membro.roles.remove(cargos.among_us);
        else if(event.d.emoji.id === emojis.hearthstone) membro.roles.remove(cargos.hearthstone);
        else if(event.d.emoji.name === "🍿") membro.roles.remove(cargos.cinema);
        else if(event.d.emoji.name === "🚙") membro.roles.remove(cargos.rocket_league);
        else if(event.d.emoji.id === emojis.cs) membro.roles.remove(cargos.cs);
        else if(event.d.emoji.id === emojis.lol) membro.roles.remove(cargos.lol);
        else if(event.d.emoji.id === emojis.valorant) membro.roles.remove(cargos.valorant);
    }
    
}