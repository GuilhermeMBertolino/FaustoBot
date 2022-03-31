module.exports.run = async (client, low, FileSync, adapter, db, guild) => {
    db.get(`${guild.id}`).remove().write();
}