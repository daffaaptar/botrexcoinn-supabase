const { Telegraf } = require('telegraf');

const bot = new Telegraf('7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY');

bot.start((ctx) => {
  const telegramId = ctx.from.id;
  const username = ctx.from.username || 'anonymous';
  const firstName = ctx.from.first_name || '';
  const lastName = ctx.from.last_name || '';
  const telegramName = `${firstName} ${lastName}`.trim();
  const webAppUrl = `https://botrexcoin.osc-fr1.scalingo.io/?telegram_id=${telegramId}&username=${username}&telegram_name=${encodeURIComponent(telegramName)}`;

  console.log(`telegram_id: ${telegramId}, username: ${username}, telegram_name: ${telegramName}`);

  ctx.reply('Welcome to the T-Rex jumping game bot!', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Play Botrexcoins', web_app: { url: webAppUrl } }]
      ]
    }
  });
});

bot.launch();
