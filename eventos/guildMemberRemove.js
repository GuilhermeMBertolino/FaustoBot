module.exports.run = async (client, low, FileSync, adapter, db, member) => {
    db.get(`${member.guild.id}`).remove({ id: `${member.user.id}` }).write();
}