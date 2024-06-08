const { Telegraf } = require('telegraf');
const TOKEN = 'YOUR_BOT_TOKEN_HERE';
const bot = new Telegraf(TOKEN);

const web_link = "https://botrexcoin.netlify.app";

bot.start((ctx) => {
    const telegramId = ctx.from.id; // Mendapatkan ID Telegram pengguna
    const gameUrl = `${web_link}?telegram_id=${telegramId}`; // Menyertakan ID Telegram dalam tautan
    ctx.reply('This bot implements a T-Rex jumping game.', {
        reply_markup: {
            inline_keyboard: [[{ text: "Play Botrexcoin", web_app: { url: gameUrl } }]],
        },
    });
});

bot.launch();
