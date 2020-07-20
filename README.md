# Leveling System Discord

A leveling system for Discord bot (using SQLite database).

Install:
```
npm i leveling-system-discord
```

Example:
```
const Discord = require('discord.js')
const client = new Discord.Client()

const leveling = require('leveling-system-discord')
const options = {
  cooldown: 60, 
  xpmin: 10,
  xpmax: 20,
  lvlupXp: 500 
}
client.leveling = new leveling(options)

client.on('message', async msg => {
  client.leveling.event.emit('message', msg);
})
```
