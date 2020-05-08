const Discord = require('discord.js');

module.exports = {
	name: 'level',
	description: 'Xem cấp độ bản thân hoặc tag ai đó.',
	execute(msg, args, client, db) {
    let user = msg.mentions.users.first()||msg.author;
		let query = `SELECT * FROM '${msg.guild.id}' WHERE id = '${user.id}'`;
		db.get(query, (err, row) => {
			if (err||!row) return msg.reply('Xảy ra lỗi với cơ sở dữ liệu!');
			const embed = new Discord.MessageEmbed()
				.setColor('0x333333')
				.setTitle(user.username)
				.setThumbnail(user.avatarURL())
        .addField("**Cấp độ:**", row.level, true)
        .addField("**Điểm:**", row.point, true)
				.setTimestamp()
			return msg.channel.send(embed);
		});
	},
};
