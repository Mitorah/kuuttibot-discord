// File: src/commands/randomcode.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const httpTools = require('../tools/httpGetAsync.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rndcode')
        .setDescription('Fetch random gif from codinglove!'),
    async execute(message) {
        // https://thecodinglove.com/random

        createMessageData = (r) => {
            var title = getTitleFromBody(r)
            title = 'CodingLove - Random!\n**' + title + '**\n'
            var image = getImageFromBody(r)
            
            message.reply(title + image)
        }

        httpTools.httpGetAsync('https://thecodinglove.com/random', createMessageData)
    }
}

function getTitleFromBody(body)
{
    var expr = 'og:title" content="(.*) - The Coding'
    const titleMatches = body.match(expr);

    let title = "No title found"

    if (titleMatches) {
        title = titleMatches[1].replace("&#039;", "'")
    }
  
    return title;
}

function getImageFromBody(body)
{
    var expr = 'data=(.*) type="image/gif"'
    const imageMatch = body.match(expr)

    var url = 'Image could not be found!'
    
    if (imageMatch) {
        url = imageMatch[1].replace('"', '');
    }
    
    return url;
}