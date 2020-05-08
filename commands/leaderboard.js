const Discord = require('discord.js');

module.exports = {
	name: 'leaderboad',
	description: 'Xem những người tám chuyện nhiều nhất máy chủ.',
	execute(msg, args, client, db) {
		let query = `SELECT * FROM '${msg.guild.id}' ORDER BY point DESC LIMIT 10`;
		db.all(query, (err, rows) => {
			if (err) return msg.reply('Xảy ra lỗi với cơ sở dữ liệu!');
			const embed = new Discord.MessageEmbed()
				.setColor('0x333333')
				.setTitle(msg.guild.name)
				.setThumbnail(msg.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
        			.setDescription(rows.map((e, i) => {
					let member = msg.guild.members.cache.find(m => m.id === e.id);
					return `${i+1}. ${(!member) ? 'Thành viên đã rời máy chủ' : `${member.user.username}#${member.user.discriminator}`}`}).join("\n\n"))
				.setTimestamp()
				.setTimestamp()
			return msg.channel.send(embed);
		});
	},
};
