# A simple discord bot that lets users decide the color of their role

This bot primarily uses the the node package [colornames](https://github.com/timoxley/colornames) to convert css3 color names into hex values.

---
## Setting Up

Create a .env file with the following:
```
DISCORD_TOKEN = 'Token of discord bot'
CHANNEL_ID = 'ID of the channel that the command is used in'
GUILD_ID = 'ID of the guild'
```
Run the bot with ``npm start`` and you're good to go!

---
## Usage

Go to the channel defined in your .env file and type ``!color <CSS3 Color>``