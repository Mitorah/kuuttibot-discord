const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping pong!'),
    async execute(message) {
        await message.reply({
            content: "pong!"
        })
    }
}
