import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Context, Telegraf } from 'telegraf';
import { Action, InjectBot, Start, Update } from 'nestjs-telegraf';
import { actionButtons } from './app.buttons';

@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>, private readonly appService: AppService) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.replyWithHTML('<b>hi</b>', actionButtons())
    // return this.appService.getData();
  }

  @Action(['list'])
  async listAction(ctx: Context) {
    await ctx.reply('List action');
  }
}
