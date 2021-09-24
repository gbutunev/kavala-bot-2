const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('pongs'),
	async execute(interaction) {
		await interaction.reply('pong 🏓');
	}
};