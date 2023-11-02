/*


██████████████████████████████████████████████████████
█▄─█─▄█▄─██─▄█▄─██─▄█─▄─▄─█─▄─▄─█▄─▄█▄─▄─▀█─▄▄─█─▄─▄─█
██─▄▀███─██─███─██─████─█████─████─███─▄─▀█─██─███─███
▀▄▄▀▄▄▀▀▄▄▄▄▀▀▀▄▄▄▄▀▀▀▄▄▄▀▀▀▄▄▄▀▀▄▄▄▀▄▄▄▄▀▀▄▄▄▄▀▀▄▄▄▀▀

Created by @Mitorah
Updated by @mazkdevf - 02.11.2023

Supports DiscordJS 14.13.0+, NodeJS 16+

*/

require("dotenv").config();
const fs = require('fs')
const {
    REST,
    Routes,
    Client,
    GatewayIntentBits,
    Collection,
    Partials,
    Events,
    ActivityType,
    EmbedBuilder
} = require('discord.js');

// Slash & Message Commands
const messageCommandFiles = fs.readdirSync('./src/commands/message').filter(file => file.endsWith('.js'));
const slashCommandFiles = fs.readdirSync("./src/commands/slash").filter(file => file.endsWith(".js"))

// Bot Client Setup
const botClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
})

// Bot Client Collections
botClient.messageCommands = new Collection();
botClient.slashCommands = new Collection();
const slashCommands = [];

// Bot Client Command Setter
for (const file of messageCommandFiles) {
    const command = require(`./src/commands/message/${file}`);
    botClient.messageCommands.set(command.data.name, command);
}

for (const file of slashCommandFiles) {
    const command = require(`./src/commands/slash/${file}`);
    slashCommands.push(command.data.toJSON());
    botClient.slashCommands.set(command.data.name, command);
}

// Bot Client Event Handlers
botClient.on(Events.Error, console.error);

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

// Bot Client Ready Event
botClient.once(Events.ClientReady, () => {
    console.clear();
    console.log('Ready!')

    const rest = new REST().setToken(process.env.DISCORD_TOKEN);

    (async () => {
        try {
            await rest.put(Routes.applicationCommands(botClient.user.id), {
                body: slashCommands
            });
            console.log("Commands have been added to Global Usage.")
        } catch (err) {
            console.error(err);
        }
    })();

    botClient.user.setPresence({
        activities: [{ name: require("./package.json").description, type: ActivityType.Streaming }],
        status: 'online',
    });
})

// Bot Client Message Event
botClient.on(Events.MessageCreate, async message => {
    if (!message.content.startsWith(process.env.MESSAGE_COMMAND_PREFIX)) return;

    const args = message.content.split(/ +/)
    // get the first word (lowercase) and remove the prefix
    const command = args.shift().toLowerCase().slice(1)

    if (!botClient.messageCommands.has(command)) return

    try {
        botClient.messageCommands.get(command).execute(message, args)
    } catch (error) {
        console.error(error);
        await message.reply({ content: 'An error occurred while trying to execute this command.', ephemeral: true });
    }
});

// Bot Client Interaction Event
botClient.on('interactionCreate', async interaction => {
    if (!interaction.type === 2) return;
    const command = botClient.slashCommands.get(interaction.commandName);
    if (!command) return;

    await interaction.deferReply({ ephemeral: true });

    const ErrorEmbed = new EmbedBuilder()
        .setDescription("An error occurred while trying to execute this command.")
        .setFooter({ text: require("./package.json").description, iconURL: botClient.user.displayAvatarURL() })

    try {
        await command.execute(interaction);
    } catch (err) {
        if (err) console.error(err);

        await interaction.editReply({
            embeds: [ErrorEmbed],
            ephemeral: true
        })
    }
});

// Bot Client Login
botClient.login(process.env.DISCORD_API)