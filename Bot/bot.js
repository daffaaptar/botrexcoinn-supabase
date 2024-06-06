const { Telegraf } = require('telegraf')
const TOKEN = '7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY'
const bot = new Telegraf(TOKEN)

const web_link = "https://botrexcoin.osc-fr1.scalingo.io/"

bot.start((ctx) => {
    ctx.reply('This bot implements a T-Rex jumping game.', {
        reply_markup: {
            inline_keyboard: [[{ text: "Play Botrexcoin", web_app: { url: web_link } }]],
        },
    });
});


bot.launch()

