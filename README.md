# kuuttibot-discord
KuuttiBot for Discord!

!!! REMEMBER NOT TO COMMIT THE API. IF YOU DO, YOU CAN RECREATE IT FROM DISCORD DEVELOPMENT PORTAL! !!!

Get token for your bot

1. Go to Discord development portal (https://discord.com/developers)
2. Create new application
3. From the menu on the left, find _Bot_
4. From there you can find the token
5. From _OAuth2 -> URL Generator_ you can create invite link with proper permissions.


Setting up development enviroment

1. Clone repository
2. Create /api-keys/discord-api-key.env and put _DISCORD_API = api_key_here_ in the file found from Discord development portal
3. Run _npm install_
4. Ready to go! Run the bot with _node app.js_
