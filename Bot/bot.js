const { Telegraf } = require('telegraf')
const TOKEN = '7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY'
const bot = new Telegraf(TOKEN)

const web_link = "https://botrexcoin.netlify.app"

bot.start((ctx) => {
    ctx.reply('Welcome', {
        reply_markup: {
            inline_keyboard: [[{ text: "Play Botrexcoin", web_app: { url: web_link } }]],
        },
    });
});


bot.launch()

