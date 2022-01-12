// File: src/commands/who.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('who')
        .setDescription('Who am I?'),
    async execute(message, args) {
        var argComment = ""
        
        args.forEach(argument => {
            argComment += argument + " "
        });
        
        if (args.length > 0)
            await message.reply(`Hello! My name is KuuttiBot! I got ${args.length} arguments: ${argComment}`)
        else
            await message.reply(`Hello! My name is KuuttiBot!`)
    }
}
