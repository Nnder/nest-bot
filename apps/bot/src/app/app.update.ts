import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Context, Telegraf } from 'telegraf';
import { Action, Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { actionButtons, refButtons, sponsorButtons } from './app.buttons';
import { config } from './config/config';

@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>, private readonly appService: AppService) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    const ref = ctx.text.replace('/start ', '');
    if(ref !== '' && ref !== '/start'){
      await ctx.replyWithHTML(`Вы пришли по реферальной ссылке ${ref}`)
    }
    await ctx.replyWithHTML('<b>hi</b>', actionButtons())
    // return this.appService.getData();
  }

  @Hears('/team')
  async ourGroups(@Ctx() ctx: Context) {
    await ctx.reply('Вот ссылки на наши группы', await refButtons(ctx))
  }

  @Hears(/[\s\S]*/)
  async handleMessage(@Ctx() ctx: Context) {
    const userId = ctx.from.id;
    const subscriptions = Promise.all(config.chats.map(async (chat)=> await ctx.telegram.getChatMember(chat, userId)))
    const subscriptionStatus = (await subscriptions).every(
      (user)=> user.status === 'member' || user.status === 'creator' || user.status === 'administrator')


      console.log(subscriptionStatus);
      console.log(subscriptions);

    if(subscriptionStatus){
      await ctx.reply('Вы состоите в группе');
    } else {
      await ctx.reply('Подпишись на наших спонсоров', await sponsorButtons(ctx));
    }
    // ctx.chatJoinRequest
    console.log(await ctx.chatMember)
    // console.log(ctx.telegram.createChatInviteLink)
    console.log(await ctx.telegram.getChat)
    // console.log(ctx.telegram.)
  }

  @Action(['list'])
  async listAction(ctx: Context) {
    await ctx.reply('List action');
  }

}
