// File: src/commands/who.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('who')
        .setDescription('Who am I?'),
    async execute(message) {
        await message.reply(`Hello! My name is KuuttiBot!`)
    }
}
