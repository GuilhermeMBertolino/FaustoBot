module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    let configs = db.get(`${message.guild.id}`).find({id: message.guild.id}).value();
    let conta = db.get(`${message.guild.id}`).find({id: message.author.id}).value();
    let cargos = configs.cargos;
    let IDs = [];
    cargos.forEach(cargo => { IDs.push(cargo.id); })
    let cargoAtual = cargo(cargos, message.member) || "Não possui";
    let npc = IDs.indexOf(cargoAtual) + 1;

    if(npc < cargos.length)
    {
        if(conta.dinheiro >= cargos[npc].custo)
        {
            if(cargoAtual !== "Não possui") message.member.roles.remove(cargoAtual);
            message.member.roles.add(cargos[npc].id);
            message.reply(`Parabéns! Você gastou ${cargos[npc].custo} FaustoCoins e recebeu o cargo de ${cargos[npc].nome}`);
            db.get(`${message.guild.id}`).find({id: message.author.id}).assign({dinheiro: conta.dinheiro - cargos[npc].custo}).write();
        }
        else if(conta.dinheiro < cargos[npc].custo)
        {
            message.reply("Você não tem FaustoCoins o suficiente para isso!");
        }
    }
    else
    {
        message.reply("Você já possui o cargo máximo do servidor! 😎");
    }
}

function cargo(cargos, membro)
{
    let cargoAtual;
    cargos.forEach(cargo => {
        if(membro.roles.cache.has(cargo.id)) cargoAtual = cargo.id;
    });
    return cargoAtual;
}