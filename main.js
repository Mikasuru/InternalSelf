const { Client } = require('discord.js-selfbot-v13');
const { RichPresence, CustomStatus, SpotifyRPC } = require('discord.js-selfbot-v13');
const client = new Client();

const config = require("./config.json")

const commands = [
    {
      command: 'hello',
      description: 'Creates a new text channel and sends 5 messages in it.',
      usage: 'Type "hello" in the chat to execute this command.'
    }
];

client.on('ready', async () => {
    const spotify = new SpotifyRPC(client)
    .setAssetsLargeImage('spotify:ab67616d00001e02768629f8bc5b39b68797d1bb') // Image ID
    .setAssetsSmallImage('spotify:ab6761610000f178049d8aeae802c96c8208f3b7') // Image ID
    .setAssetsLargeText('未来茶屋 (vol.1)') // Album Name
    .setState('Yunomi; Kizuna AI') // Artists
    .setDetails('ロボットハート') // Song name
    .setStartTimestamp(Date.now())
    .setEndTimestamp(Date.now() + 1_000 * (2 * 60 + 56)) // Song length = 2m56s
    .setSongId('667eE4CFfNtJloC6Lvmgrx') // Song ID
    .setAlbumId('6AAmvxoPoDbJAwbatKwMb9') // Album ID
    .setArtistIds('2j00CVYTPx6q9ANbmB2keb', '2nKGmC5Mc13ct02xAY8ccS'); // Artist IDs

  if (config.EnableRPC == true) client.user.setPresence({ activities: [spotify] });
  console.log(`${client.user.username} is ready!`);
  console.table(commands, ['command', 'description', 'usage']);
})

var NumChannel = 5//number to create channel
var NumMessage = 5//number to send message to channel

client.on("messageCreate", async message => {
    if (message.content === 'hello') {
        if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
          return message.reply('I do not have permission to manage channels.');
        }
        for (let i = 0; i < NumChannel; i++) {
            const newChannel = await message.guild.channels.create(config.ChannelName, {
                type: 'GUILD_TEXT',
                topic: config.ChannelTopic,
            });
        
            for (let i = 0; i < NumMessage; i++) {
                await newChannel.send(config.ChannelMsg);
            }

        }
        console.log(`${client.user.username} have created a new channel called "${newChannel.name}" and sent 5 messages in it.`)
      }
});

client.login(config.Token);