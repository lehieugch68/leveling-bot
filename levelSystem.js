class Talker {
	constructor(guildID) {
		this.talkerID = [];
		this.guildID = guildID;
	}
}

class LevelSystem {
	constructor(client, db, options = {cooldown: 60, xpmin: 10, xpmax: 20, lvlupXp = 500}) {
		this.client = client;
		this.db = db;
		this.talkedRecently = [];
		this.cooldown = options.cooldown;
		this.xpmin = options.xpmin;
		this.xpmax = options.xpmax;
		this.lvlupXp = options.lvlupXp;
		client.on('message', async msg => {
			if (msg.author.bot) return undefined;
			if (!this.talkedRecently.find(g => g.guildID === msg.guild.id)) {
				let talkerGuild = new Talker(msg.guild.id);
				this.talkedRecently.push(talkerGuild);
			}
			let talker = this.talkedRecently.find(g => g.guildID === msg.guild.id).talkedID;
			if (talker.every(id => id !== msg.author.id)) {
				this.talkedRecently.find(g => g.guildID === msg.guild.id).talkerID.push(msg.author.id);
				var xp = randomXP(this.xpmin, this.xpmax);
				var point = xp, level = 1;
				try {
					await this.db.run(`CREATE TABLE IF NOT EXISTS '${msg.guild.id}' (id VARCHAR(30) PRIMARY KEY, point INTEGER NULL, level INTEGER NULL)`);
					this.db.get(`SELECT * FROM '${msg.guild.id}' WHERE id = '${msg.author.id}'`, (err, row) => {
						if (err) return console.log(err);
						if (row) {
							point += row.point;
							level = (point >= this.lvlupXp) ? Math.floor(point/this.lvlupXp) : 1;
						}
						this.db.run(`INSERT INTO '${msg.guild.id}' (id, point, level) VALUES ('${msg.author.id}', ${point}, ${level}) ON CONFLICT(id) DO UPDATE SET point = ${point}, level = ${level}`);
					});
				} catch (error) {
					return console.log(error);
				}
				setTimeout(() => {
					this.talkedRecently.find(g => g.guildID === msg.guild.id).talkerID = this.talkedRecently.find(g => g.guildID === msg.guild.id).talkerID.filter(id => id !== msg.author.id);
				}, 1000*this.cooldown)
			}
		});
	}
}

function randomXP(xpmin, xpmax) {
	return Math.floor(Math.random() * (xpmax - xpmin + 1)) + xpmin;
}

module.exports = LevelSystem;
