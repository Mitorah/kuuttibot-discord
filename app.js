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
    Client,
    GatewayIntentBits,
    Collection,
    Partials,
    Events,
    ActivityType,
    EmbedBuilder
} = require('discord.js');

// Message Commands
const messageCommandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

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

// Bot Client Command Setter
for (const file of messageCommandFiles) {
    const command = require(`./src/commands/${file}`);
    botClient.messageCommands.set(command.data.name, command);
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

// Bot Client Login
botClient.login(process.env.DISCORD_API)