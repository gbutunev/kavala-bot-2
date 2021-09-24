const fs = require('fs');

function loadConfig() {

    const folderPath = './config/';
    const filePath = './config/config.json';

    const defaultConfigContent = {
        mode: 'release', //release | debug
        token: 'ENTER_BOT_TOKEN_HERE',
        devGuildId: 'ENTER_DEVELOPMENT_GUILD_ID_HERE',
        clientId: 'ENTER_CLIENT_ID_HERE'
    }

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultConfigContent, null, '\t'));

        throw new Error('Config file was not found. Please open the newly created one and fill in the necessary information.');
    }

    let config = require('../config/config.json');
    for (const key in config) {
        if (Object.hasOwnProperty.call(config, key)) {
            if (config[key].includes('ENTER')) {
                throw new Error(`Config file not set up! Please enter value of "${key}" in config.json!`);
            }
        }
    }

    return config;
}

module.exports = loadConfig;