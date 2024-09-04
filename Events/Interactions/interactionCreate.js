const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType, PermissionFlagsBits, resolveColor } = require("discord.js");

module.exports = {
	name: "interactionCreate",

	async execute(interaction, client) {
		const {customId, values, fields, member, user, guild, commandName, channel, guildId, message, } = interaction;
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(commandName);
            
            if (!command || !checkWhitelist ) {
                return interaction.reply({
                    content: `this is not a valid command or you do not have the permissions to run it`,
                    ephemeral: true,
                });
            }

            command.execute(interaction, client);
        }

		if(interaction.isUserContextMenuCommand()) return;

		if(interaction.isMessageContextMenuCommand()) return;

        if (interaction.isModalSubmit()) return;

        if (interaction.isButton()) return;

        if (interaction.isStringSelectMenu()) return;
    },
};

function checkWhitelist (interaction, command) {
    const uidWhitelist = ["622171121151770624", "758653252211441664", "399912356659855361" ]; // 1: spag. 2: seaotter, 3: james
    
    if (command.whitelist) {
        return uidWhitelist.includes(interaction.member.id);
    }
    return true;
}