require("dotenv").config()
const { Telegraf } = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const bot = new Telegraf(process.env.BOT_TOKEN)
const commands = require('./commands/index')


// lastname scene
const lastname = new Scene('lastname')
lastname.enter((ctx) => ctx.reply(`Familiyangizni kiriting.`))
lastname.leave((ctx) => ctx.scene.enter('phone'))
lastname.on('message', leave())


// firstname scene
const firstname = new Scene('firstname')
firstname.enter((ctx) => ctx.reply(`Ro'yxatdan o'tish uchun ismingizni kiriting.`))
firstname.leave((ctx) => {
    ctx.reply('Siz')
    console.log(ctx.scenes);
})
// firstname.leave((ctx) => ctx.scene.enter('lastname'))
firstname.on('message', leave())


// phone scene
const phone = new Scene('phone')
phone.enter((ctx) => ctx.reply(`telfonizi kiriting.`))
phone.leave((ctx) => ctx.reply('Siz muvofaqqiyatli suc'))
phone.on('message', leave())

// Create scene manager
const stage = new Stage()

// Scene registration
stage.register(firstname)
stage.register(lastname)
stage.register(phone)

console.log(stage);

bot.use(session())
bot.use(stage.middleware())
bot.start((ctx) => ctx.scene.enter('firstname'))
bot.startPolling()

bot.launch()
console.log('Bot has been started')