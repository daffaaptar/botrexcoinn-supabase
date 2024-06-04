const { Telegraf } = require('telegraf')
const TOKEN = '7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY'
const bot = new Telegraf(TOKEN)

bot.start((ctx) => ctx.reply('Welcome'))

bot.launch()

