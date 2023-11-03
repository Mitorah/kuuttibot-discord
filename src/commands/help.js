const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help command for KuuttiBot'),
    async execute(message) {
        await message.reply({
            embeds: [new EmbedBuilder()
                .setTitle("Help menu to show commands for KuuttiBot")
                .setDescription("KuuttiBot is a bot that has slash commands and normal commands. KuuttiBot is made with Discord.js and Node.js.")
                .addFields(
                    {
                        name: process.env.MESSAGE_COMMAND_PREFIX + "ping",
                        value: "Respond with pong!"
                    },
                    {
                        name: process.env.MESSAGE_COMMAND_PREFIX + "rndcode",
                        value: "Respond with random from thecodinglove.com"
                    },
                    {
                        name: process.env.MESSAGE_COMMAND_PREFIX + "who",
                        value: "Responds with who the bot is and with args"
                    }
                )]
        });
    }
}
