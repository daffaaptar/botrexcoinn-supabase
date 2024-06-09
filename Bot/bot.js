const { Telegraf } = require('telegraf');

const bot = new Telegraf('7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY');

bot.start((ctx) => {
  const telegramId = ctx.from.id;
  const username = ctx.from.username;
  const webAppUrl = `https://botrexcoin.osc-fr1.scalingo.io/?telegram_id=${telegramId}&username=${username}`;

  ctx.reply('Welcome to the T-Rex jumping game bot!', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Open Web App', web_app: { url: webAppUrl } }]
      ]
    }
  });
});

bot.launch();

