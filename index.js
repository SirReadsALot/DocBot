const { Client, MessageEmbed, GuildMember, NewsChannel } = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Client();

client.once('ready', () => {
	console.log("DocBot is ready!")
});

client.on('message', message => {
	if (message.content === `${prefix}docbot`) {
		message.channel.send('Hello!');
	}
	else if (message.content === `${prefix}server&members`) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	}
	if (message.content === `${prefix}creator`) {
		const creator = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Creator Of Docassets')
			.setThumbnail('https://images-ext-1.discordapp.net/external/ZkqeM2Uy1aqWNtgVunLwcf4TKLDE97IQOiTj6kaUisY/%3Fwidth%3D256%26s%3D517a9035d28a550554e552968ae203e88d924f0a/https/styles.redditmedia.com/t5_39ue82/styles/communityIcon_mehctj8htst51.png')
			.setAuthor('Doctorpus', 'https://images-ext-2.discordapp.net/external/6KmfJS4ZJW3j_wGC2L7RmivAtb_lJFn6QTGlEIcpAcw/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/293544191152357386/0e85c72f722e73be22611a732111d2cb.png?width=447&height=447')
			.setDescription('The guy who created docassets');
		message.channel.send(creator);
	}
	if (message.content === `${prefix}help`) {
		const helpEmbed = new MessageEmbed()
			.setColor('#09F1E3')
			.setTitle('All commands for DocBot :)')
			.setDescription(`!server&members - To get the server's name and the number of members\n
			!docbot - To see if DocBot is working\n
			!creator - To see who is the creator of docassets\n
			!vote - For polls\n
			!docbotpfp - to get the .png image of DocBot's pfp\n
			!nick - for changing nickname\n
			!nickreset - for resetting your nickname\n
			**¬¬¬¬¬¬¬ FOR STAFF ¬¬¬¬¬¬¬**\n
			!mute - for muting members\n
			!unmute - for unmuting members\n
			!clear - for clearing messages`);
		message.channel.send(helpEmbed);
	}
	if (message.content.startsWith("!vote")) {
		message.react('<:Upbird:770386962098946080>')
			.then(() => message.react('<:Downbird:770386982379454504>'))
			.catch(() => console.log('One of the emotes failed to react'));
	}
	if (message.content === `${prefix}news`) {
		const BotNews = new MessageEmbed()
			.setColor('#09F1E3')
			.setTitle('DocBot v1.6 has been released!')
			.setDescription("Hello everyone!\nDocBot v1.6 has been released and it has some stuff!\n¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\n __**Information**__\nChanges:\n1)!mute command added (but not finished)\n2)!nick command added to change your nicknames\n3)DocBot now welcomes people when they join the server\nHave a nice day!")
		message.channel.send(BotNews);
	}
});
client.on('message', message => {
	if (message.content.startsWith("!clear")) {
		if (message.member.roles.cache.has("770158995523633223") || message.member.roles.cache.has("770157857852620810") 
		|| message.member.roles.cache.has("770315598692352062") || message.member.roles.cache.has("801470153279668284")
		|| message.member.roles.cache.has('845661418904616982') || message.member.roles.cache.has('844910059087593473')) { // the first 2 roles are in Docassets.
			const args = message.content.split(" ")
			const amount = parseInt(args[1]);

			if (isNaN(amount)) {
				return message.reply("That is not a valid number.");
			} else if (amount < 40) {
				message.channel.bulkDelete(amount, true).catch(err => {
					console.error(err);
					message.channel.send('There was an error trying to clear the messages in this channel.');
				})
				message.channel.send("Deleted messages.")
			}
		} else {
			message.channel.send("Sorry, you're not a Moderator/Admin to use this command");
		}
	}
	if (message.content === `${prefix}docbotpfp`) {
		message.channel.send("https://media.discordapp.net/attachments/800415005950083098/801499263284674670/DocBot_Profile.png")
	}
	if (message.member.roles.cache.has("770158995523633223") || message.member.roles.cache.has("770157857852620810") 
	|| message.member.roles.cache.has("770315598692352062") || message.member.roles.cache.has("845661418904616982")
	|| message.member.roles.cache.has("844910059087593473")) {
		if (message.content.toLowerCase().startsWith("!mute")) {
			const args = message.content.split(" ");
			const person_muted = message.mentions.members.first() || message.guild.roles.cache.get(args[1])
			if (!person_muted) {
				return message.reply("Couldn't find the person!")
			}

			let muted_role = message.guild.roles.cache.find(role => role.name === "Muted")
			if (!muted_role) {
				return message.reply("Couldn't find the role!")
			}
			let mute_time = parseInt(args[2]);
			if (!mute_time) {
				return message.reply("You didn't specify the mute duration!")
			}

			person_muted.roles.remove(muted_role.id);
			person_muted.roles.add(muted_role.id)
			message.channel.send(`<@!${person_muted.user.id}> has been muted for ${mute_time} seconds`)
			setTimeout(() => {
				person_muted.roles.add(muted_role.id)
				person_muted.roles.remove(muted_role.id)
			}, mute_time * 60 * 1000 //ms(time))
		)}
		
		if (message.content.toLowerCase().startsWith("!unmute")) {
			const args = message.content.split(" ");
			const person_muted = message.mentions.members.first() || message.guild.roles.cache.get(args[1])
			if (!person_muted) {
				return message.reply("Couldn't find the person!")
			}
			let muted_role = message.guild.roles.cache.find(role => role.name === "Muted")
			if (!muted_role) {
				return message.reply("Couldn't find the role!")
			}
			person_muted.roles.remove(muted_role.id);
		}
	}

	if (message.channel.name.toLowerCase() === "fan-art" || message.channel.name.toLowerCase() === 'misc-art') {
		if (message.attachments.every(attachIsImage)) {
			message.react('<:Upbird:770386962098946080>')
				.then(() => message.react('<:Downbird:770386982379454504>'))
			// .catch(() => console.log('One of the emotes failed to react'));
		} else {
			message.delete();
		}

		function attachIsImage(msgAttach) {
			var url = msgAttach.url;
			console.log(message.attachments);
			//True if this url is a png image.
			return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
		}
	}
	
	if (message.content.toLowerCase().startsWith("!nick")) {
		if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
			return message.channel.send("I don't have permission to change your nickname!");
		} else {
			const args = message.content.split(" ");
			message.member.setNickname((args[1]));
			message.channel.send(`Your nickname has been changed to ${args[1]}.`)
		} 
	if (message.content.toLowerCase().startsWith("!nickreset")) {
		if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
			return message.channel.send("I don't have permission to change your nickname!");
		} else {
			message.member.setNickname(null)
			message.channel.send("Your nickname has been reset.")
		} 
	}
}});

// FOR DEEEEP.IO DESKTOP CLIENT SERVER
client.on("guildMemberAdd", (member) => {
	console.log(member)
	const genAnnouncementsCha = '844944890911522858';
	const welcomeCha = '844159533647003659';
	const updatesCha = '841929957467095060';
	const generalCha = '841929039354003489';
	const channel = member.guild.channels.cache.get(generalCha);
	var message = `Welcome <@${member.id}>!, check out ${member.guild.channels.cache.get(welcomeCha)} for information, ${member.guild.channels.cache.get(updatesCha)} for updates and ${member.guild.channels.cache.get(genAnnouncementsCha)} for announcements`;
	channel.send(message)

	const joinRole = member.guild.roles.cache.find(role => role.name === "Member")
	member.roles.add(joinRole)
})

// FOR DOCASSETS SERVER
client.on("guildMemberAdd", (member) => {
	console.log(member)
	const changelogChaD = '770150067448578068';
	const announcementsChaD = '770150048851820575';
	const rulesChaD = '770148878514651176';
	const channel = message.guild.channels.cache.find(channel => channel.name === "general")
	var messageDoc = `Welcome <@${member.id}> to the Official Docassets server! check out ${member.guild.channels.cache.get(changelogChaD)} for changes in the extension
	and ${member.guild.channels.cache.get(announcementsChaD)} for announcements! Oh and also don't forgot to read the ${member.guild.channels.cache.get(rulesChaD)}`;
	channel.send(messageDoc)
})

client.login(token)
