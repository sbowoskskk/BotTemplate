require('discord.js');
require("colors");
const moment = require('moment');
const chalk = require('chalk');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`${chalk.hex('#a9a9a9')(`[${moment().format('DD/MM - HH:mm:ss')}]`)} ${chalk.hex('#141414').bgHex('#1E5B9C')("[CLIENT]")} - Ready to use`)
        client.user.setPresence({ status: "online" });
    },
};