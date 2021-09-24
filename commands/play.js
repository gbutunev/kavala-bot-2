const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('p')
        .setDescription('Plays a song or resumes the queue')
        .addStringOption(option => option.setName('song').setDescription('song title or link').setRequired(false)),
    async execute(interaction) {
        let player = interaction.client.player;

        if (!interaction.member.voice.channelId) {
            interaction.reply('You are not in a voice channel');
            return;
        }

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            interaction.reply('You are not in the same voice channels');
            return;
        }

        let queue = interaction.client.player.getQueue(interaction.guild);
        if (!queue) {
            queue = player.createQueue(interaction.guild, {
                metadata: {
                    channel: interaction.channel
                }
            });
        }

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch (e) {
            queue.destroy();
            interaction.reply('Could not connect');
        }

        let query = interaction.options.getString('input');
        interaction.reply(query);
    }
};