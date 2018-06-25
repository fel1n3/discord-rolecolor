require('dotenv').config()

import { Client, Message, Role, GuildMember} from 'discord.js'
import { split, without, join } from 'lodash'

const css3 = require('colornames')

const cfg = {
    cmdid: process.env.CHANNEL_ID,
    gid: process.env.GUILD_ID,
    token: process.env.DISCORD_TOKEN
}

const client = new Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', msg => {
    let cmd: string[] = split(msg.content, ' ')

    if (cmd[0] != '!color' && cmd[0] != '!colour' ) return
    if (msg.channel.id != cfg.cmdid) return

    const colorn = join(without(cmd, cmd[0]), ' ');
    let color = css3.get(colorn)
    if( !color ) return msg.reply(`\`\`${colorn}\`\` is not a valid CSS3 color.`)

    let guild = client.guilds.find('id', cfg.gid)
    let role = guild.roles.find('name', color.name)
    let guser = guild.members.find('id', msg.author.id)

    guser.roles.array().forEach((val,i) => {
        if(!css3.get(val.name)) return
        //has a color
        guser.removeRole(val)
            .catch(console.error)
    })

    if(!role) {
        guild.createRole({
            name: color.name,
            color: color.value,
            position: 4
        }) 
        .then(role => {
            return giveColor(msg, role, guser);
        })
        .catch(console.error)
    } else {
        return giveColor(msg, role, guser)
    }
})

client.login(cfg.token)

function giveColor(msg: Message, role: Role, guser: GuildMember) {
    guser.addRole(role)
        .catch(console.error)
    return msg.channel.send(`Color \`\`${role.name}\`\` given to ${msg.author}`);
}
