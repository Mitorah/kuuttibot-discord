const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("who")
    .setDescription("Who am I?")
    .addStringOption((option) =>
      option.setName('name')
        .setDescription('Your name')
        .setRequired(false)
    ),
  async execute(interaction) {
    const name = interaction.options.getString('name') || null;
    if (name) await interaction.editReply({
      content: `Hello ${name}! My name is KuuttiBot!`
    });
    else await interaction.editReply({
      content: `Hello! My name is KuuttiBot!!`
    });
  },
};