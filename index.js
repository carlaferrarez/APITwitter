const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const Apitwitter = require("./api/server");
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const Stage = require('telegraf/stage');
const session = require('telegraf/session');
const WizardScene = require('telegraf/scenes/wizard');


const bot = new Telegraf(process.env.TOKEN)

bot.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const response_time = new Date() - start
  console.log(`(Response Time: ${response_time})`)
})
bot.start((ctx) => ctx.reply(`Olá ${ctx.from.first_name}, tudo bem? Eu sou o TweetBot. Me manda um /twitter que eu te conto mais do que eu posso fazer :)`))
bot.hears('/twitter', (ctx) => {
  ctx.reply('Manda um /pesquisa para mim que eu te trago algumas informações legais :)')
})


const superWizard = new WizardScene(
  'super-wizard',
  ctx => {
    ctx.reply("Qual tag você deseja buscar? (exemplo: /pesquisa nasa)");
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.tag = ctx.message.text;
    Apitwitter(ctx.message.text.split(" ")[1]);
    ctx.reply(`Your tag is ${ctx.wizard.state.data.tag}`);
    return ctx.scene.leave();
  }
);
const stage = new Stage([superWizard]);


bot.use(session());
bot.use(stage.middleware());
bot.command('/pesquisa', ctx => {
  ctx.scene.enter('super-wizard');
});

bot.launch()