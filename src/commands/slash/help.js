const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Help command for KuuttiBot"),
    async execute(interaction) {
        await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setTitle("Help menu to show commands for KuuttiBot")
                .setDescription("KuuttiBot is a bot that has slash commands and normal commands. KuuttiBot is made with Discord.js and Node.js.")
                .addFields(
                    {
                        name: "/ping",
                        value: "Respond with pong!"
                    },
                    {
                        name: "/rndcode",
                        value: "Respond with random from thecodinglove.com"
                    },
                    {
                        name: "/who <optional name>",
                        value: "Responds with who the bot is and with args"
                    }
                )]
        })
    },
};