const { Telegraf } = require('telegraf');
const supabase = require('../src/supabaseClient'); // Pastikan path benar
const TOKEN = '7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY';
const bot = new Telegraf(TOKEN);

const web_link = "https://botrexcoin.osc-fr1.scalingo.io/";

bot.start((ctx) => {
  const user_id = ctx.from.id; // Get the user's ID
  const personalized_link = `${web_link}?user_id=${user_id}`; // Append user ID to the URL

  ctx.reply('This bot implements a T-Rex jumping game.', {
    reply_markup: {
      inline_keyboard: [[{ text: "Play Botrexcoin", web_app: { url: personalized_link } }]],
    },
  });
});

bot.launch();
