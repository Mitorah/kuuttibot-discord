/* find api key, only on server. This file is needed when developing.
 * Create /api-keys/discord-api-key.env on running folder */
const dotenv = require('dotenv');
dotenv.config({ path: process.cwd() + '/api-keys/discord-api-key.env'});
const apikey = process.env.DISCORD_API;

const  { Client, Intents} = require ('discord.js')

const botClient = new Client({
    autorun: true,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

botClient.on('message', (msg) => {
    if(msg.content.startsWith('!ping')) {
        msg.channel.send('new-pong!')
    }
})

botClient.login(process.env.DISCORD_API) /* Access api key */

