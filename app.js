/* Create /api-keys/discord-api-key.env on running folder */
const dotenv = require('dotenv');
dotenv.config({ path: process.cwd() + '/api-keys/discord-api-key.env'});

const fs = require('fs')

const { Client, Intents, Collection } = require ('discord.js');
const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));

const botClient = new Client({
    autorun: true,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

botClient.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	botClient.commands.set(command.data.name, command);
}

botClient.once('ready', () => {
    console.log('Ready!')
})

botClient.on('messageCreate', async message => {
    
    if (!message.content.startsWith('!')) return;
    
    const args = message.content.split(/ +/)
    // get the first word (lowercase) and remove the prefix
    const command = args.shift().toLowerCase().slice(1)

    if (!botClient.commands.has(command)) return

	try {
        botClient.commands.get(command).execute(message)
	} catch (error) {
        console.error(error);
		await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

botClient.login(process.env.DISCORD_API) /* Access api key */