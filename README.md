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

const db = './levelingSystem.db'; //path 
const options = {
  cooldown: 60, //second
  xpmin: 10,
  xpmax: 20,
  lvlupXp: 500 
}
client.leveling = new leveling(db, options)

client.on('message', async msg => {
  client.leveling.event.emit('message', msg);
  
  //Get info
  if (msg.content.toLowerCase().startsWith(!get)) {
	let info = await client.leveling.Get(msg.guild.id, msg.author.id);
	msg.reply(`Level: ${info.level} \n Point: ${info.point}`);
  }
})
```
