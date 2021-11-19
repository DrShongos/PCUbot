const InvalidUsageError = require("../exceptions/invalid_usage");
const Rank = require("../schemas/rank");
const mongoose = require("mongoose");
const { Role } = require("discord.js");

module.exports = async function setrole(_, message, role, priority) {
    role = message.guild.roles.cache.get(role.match(/\d/g).join(""));

    const rank = mongoose.model("Rank", Rank());

    if (!priority || priority == 0) {
        await rank.findOneAndDelete({ role_id: role.id}).exec();
        message.channel.send("Deleted role! \n");
        return;
    }

    priority = parseInt(priority);
    console.log(typeof priority)

    //if (typeof priority != number) throw new InvalidUsageError("Priority is not a number!");

    const data = {
        name: role.name, 
        role_id: role.id, 
        priority: priority
    };

    const rankDB = await rank.findOne(data);

    if (!rankDB) {
        const new_rank = new rank(data);

        new_rank.save((e) => {
            if (e) {
                console.log(e);
                return;
            }
    
            message.channel.send("Succesfully set a new role!");
        }).exec();
    }

}