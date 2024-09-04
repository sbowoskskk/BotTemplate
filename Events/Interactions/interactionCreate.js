const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType, PermissionFlagsBits, resolveColor } = require("discord.js");

module.exports = {
	name: "interactionCreate",

	async execute(interaction, client) {
		const {customId, values, fields, member, user, guild, commandName, channel, guildId, message, } = interaction;
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(commandName);
            const blacklistedUsers = ["all", "disallowed", "uids"];

            if (command && blacklistedUsers.includes(interaction.member.id)) {
                return interaction.reply({content: 'You\'re blacklisted from using my commands.', ephemeral: true})
            }
            
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
    const uidWhitelist = ["all","allowed","uids" ];
    
    if (command.whitelist) {
        return uidWhitelist.includes(interaction.member.id);
    }
    return true;
}