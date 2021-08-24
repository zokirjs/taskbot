require("dotenv").config()
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => ctx.reply('Welcome'))

bot.launch()
console.log('Bot has been started')