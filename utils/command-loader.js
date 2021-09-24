const fs = require('fs');

function loadCommands(collection, deploy) {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        try {
            const command = require(`../commands/${file}`);
            if (deploy) {
                collection.push(command.data.toJSON());
            }
            else {
                collection.set(command.data.name, command);
            }
        } catch (error) {
            console.error('\x1b[31m', `Error while loading command "${file}" in ${deploy ? 'deployment' : 'client'} collection.`);
        }
    }
}

module.exports = loadCommands;