# const { Client... const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`${client.user.tag} aktif ve hazır!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    // .lock Komutu
    if (message.content.toLowerCase() === '.lock') {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return message.reply('❌ Bu komut için **Kanalları Yönet** yetkisi gerekiyor.');
        }

        try {
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SendMessages: false
            });
            message.channel.send('🔒 **Kanal kilitlendi!**');
        } catch (error) {
            message.reply('❌ Kanal kilitlenirken hata oluştu. Botun rol yetkilerini kontrol et.');
        }
    }

    // .unlock Komutu
    if (message.content.toLowerCase() === '.unlock') {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return message.reply('❌ Bu komut için **Kanalları Yönet** yetkisi gerekiyor.');
        }

        try {
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SendMessages: true
            });
            message.channel.send('🔓 **Kanalın kilidi açıldı!**');
        } catch (error) {
            message.reply('❌ Kanal açılırken hata oluştu.');
        }
    }
});

client.login(process.env.BOT_TOKEN);
