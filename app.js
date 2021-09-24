const loadConfig = require('./utils/config-loader.js');
const Discord = require('discord.js');
const loadCommands = require('./utils/command-loader.js');
const refreshCommands = require('./utils/command-refresher.js');
const { Player } = require("discord-player");

const config = loadConfig();

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILDS] });
client.commands = new Discord.Collection();
client.player = new Player(client);
const deploymentCommands = [];

loadCommands(client.commands);
loadCommands(deploymentCommands, true);

client.once('ready', () => {
    console.log('Bot is running.');
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Oopsie. Who shit myself?', ephemeral: true });
    }
});

client.login(config.token);
refreshCommands(deploymentCommands, config);

//https://discord.com/api/oauth2/authorize?client_id=CLIENTIDHERE&permissions=3164160&scope=bot%20applications.commands