const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('say hi'),
    whitelisted: true,
    async execute(interaction, client) {
        const response = 'pong'
        if (response) {return interaction.reply(response)} else {return interaction.reply('no match found')}
    }
}