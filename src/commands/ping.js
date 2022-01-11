// File: src/commands/who.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping pong!'),
    async execute(message) {
        await message.reply(`pong!`)
    }
}
