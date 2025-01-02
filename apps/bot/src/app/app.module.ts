import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import LocalSession from 'telegraf-session-local';

const sessions = new LocalSession({
  database: 'session_db.json'
})

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware() ],
      // botName: 'main',
      token: '5664924384:AAFi_JTUpyRNAaurEDO5IlrQXIcJBymWKwA'
    })
  ],
  // controllers: [],
  providers: [AppService, AppUpdate],

})
export class AppModule {}
