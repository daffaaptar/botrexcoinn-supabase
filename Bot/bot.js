const { Telegraf } = require('telegraf');

const TOKEN = '7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY';
const bot = new Telegraf(TOKEN);

const web_link = "https://botrexcoin.osc-fr1.scalingo.io/";

bot.start((ctx) => {
  ctx.reply('This bot implements a T-Rex jumping game.', {
    reply_markup: {
      inline_keyboard: [[{ text: "Play Botrexcoin", web_app: { url: web_link } }]],
    },
  });
});

// Middleware to log requests
bot.use((ctx, next) => {
  console.log(ctx.message);
  return next();
});

bot.launch();
console.log('Bot is running...');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
