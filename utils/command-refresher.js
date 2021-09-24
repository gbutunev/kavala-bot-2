const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

async function refreshCommands(commands, config) {
    const rest = new REST({ version: '9' }).setToken(config.token);

    try {
        console.log('Started refreshing application (/) commands.');
        if (config.mode == 'debug') {
            await rest.put(
                Routes.applicationGuildCommands(config.clientId, config.devGuildId),
                { body: commands },
            );
        }
        else {
            await rest.put(
                Routes.applicationCommands(config.clientId),
                { body: commands },
            );
        }
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('\x1b[31m', '=== COULD NOT REFRESH SLASH COMMANDS ===')
        console.error('\x1b[31m', error);
    }
}

module.exports = refreshCommands;