const events = require('events')
const sqlite3 = require('sqlite3').verbose()

const sqlite3Promise = require('./sqlite3Promise.js')
const randomXP = require('./randomXP.js')

class Talker {
	constructor(guildID) {
		this.talkerID = [];
		this.guildID = guildID;
	}
}

class LevelingSystem {
	constructor(db, options = {cooldown: 60, xpmin: 10, xpmax: 20, lvlupXp: 500}) {
		this.event = new events.EventEmitter();
		this.db = new sqlite3.Database(db, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {if (err) console.log(err)})
		this.talkedRecently = [];
		this.options = options;
		this.event.on('message', async (msg) => {
			if (!this.talkedRecently.find(g => g.guildID === msg.guild.id)) {
				let talkerGuild = new Talker(msg.guild.id);
				this.talkedRecently.push(talkerGuild);
			}
			let talker = this.talkedRecently.find(g => g.guildID === msg.guild.id).talkerID;
			if (talker.some(id => id === msg.author.id)) return;
			let xp = randomXP(this.options.xpmin, this.options.xpmax);
			let point = xp, level = 0;
			try {
				await sqlite3Promise.Run(this.db, `CREATE TABLE IF NOT EXISTS '${msg.guild.id}' (id VARCHAR(30) PRIMARY KEY, point INTEGER NULL, level INTEGER NULL)`);
				let row = await sqlite3Promise.Get(this.db, `SELECT * FROM '${msg.guild.id}' WHERE id = '${msg.author.id}'`);
				if (row != null) {
					point += row.point;
					level = (point >= this.options.lvlupXp) ? Math.floor(point/this.options.lvlupXp) : 0;
				}
				await sqlite3Promise.Run(this.db, `INSERT INTO '${msg.guild.id}' (id, point, level) VALUES ('${msg.author.id}', ${point}, ${level}) ON CONFLICT(id) DO UPDATE SET point = ${point}, level = ${level}`);
			} catch (err) { 
				return console.log(err);
			}
			this.talkedRecently.find(g => g.guildID === msg.guild.id).talkerID.push(msg.author.id);
			setTimeout(() => {
				this.talkedRecently.find(g => g.guildID === msg.guild.id).talkerID = this.talkedRecently.find(g => g.guildID === msg.guild.id).talkerID.filter(id => id !== msg.author.id);
			}, 1000*this.options.cooldown);
		})
	}
	Get(guildID, userID) {
		return new Promise(async (resolve, reject) => {
			sqlite3Promise.Get(this.db, `SELECT * FROM '${guildID}' WHERE id = '${userID}'`).then(row => {
				return resolve(row);
			}).catch(err => { return reject(err) })
		})
	}
}

module.exports = LevelingSystem;
