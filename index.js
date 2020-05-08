const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = ''; //token bot

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./Discord.db'); //tệp SQLite

const options = {
  cooldown: 60,
  xpmin: 10,
  xpmax: 20,
  lvlupXP: 500
}

const LevelSystem = require('./levelSystem.js');
const levelSystem = new LevelSystem(client, db);

client.login(TOKEN)
