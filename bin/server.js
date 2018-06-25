"use strict";
exports.__esModule = true;
require('dotenv').config();
var discord_js_1 = require("discord.js");
var lodash_1 = require("lodash");
var css3 = require('colornames');
var cfg = {
    cmdid: process.env.CHANNEL_ID,
    gid: process.env.GUILD_ID,
    token: process.env.DISCORD_TOKEN
};
var client = new discord_js_1.Client();
client.on('ready', function () {
    console.log("Logged in as " + client.user.tag);
});
client.on('message', function (msg) {
    var cmd = lodash_1.split(msg.content, ' ');
    if (cmd[0] != '!color' && cmd[0] != '!colour')
        return;
    if (msg.channel.id != cfg.cmdid)
        return;
    var colorn = lodash_1.join(lodash_1.without(cmd, cmd[0]), ' ');
    var color = css3.get(colorn);
    if (!color)
        return msg.reply("``" + colorn + "`` is not a valid CSS3 color.");
    var guild = client.guilds.find('id', cfg.gid);
    var role = guild.roles.find('name', color.name);
    var guser = guild.members.find('id', msg.author.id);
    guser.roles.array().forEach(function (val, i) {
        if (!css3.get(val.name))
            return;
        //has a color
        guser.removeRole(val)["catch"](console.error);
    });
    if (!role) {
        guild.createRole({
            name: color.name,
            color: color.value
        })
            .then(function (role) {
            return giveColor(msg, role, guser);
        })["catch"](console.error);
    }
    else {
        return giveColor(msg, role, guser);
    }
});
client.login(cfg.token);
function giveColor(msg, role, guser) {
    guser.addRole(role)["catch"](console.error);
    return msg.channel.send("Color ``" + role.name + "`` given to " + msg.author);
}
