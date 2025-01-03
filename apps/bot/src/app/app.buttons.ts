import { Context, Markup } from "telegraf";
import { config } from "./config/config";

export function actionButtons(){
  return Markup.inlineKeyboard([
    Markup.button.callback('Список дел', 'list'),
    Markup.button.callback('Список дел', 'list'),
    Markup.button.callback('Список дел', 'list'),
    Markup.button.callback('Список дел', 'list'),
  ])

  // return Markup.keyboard([
  //     Markup.button.callback('Список дел1 list', 'list'),
  //     Markup.button.callback('Список дел2', 'edit'),
  //     Markup.button.callback('Список дел3', 'delete'),
  //   ],
  // {
  //   columns: 3
  // })

//   const keyboard = {
//     reply_markup: {
//         inline_keyboard: [
//             [{text: 'Список дел', callback_data: 'list'}],
//             [{text: 'Список дел', callback_data: 'edit'}],
//             [{text: 'Список дел', callback_data: 'update'}],
//         ],
//     },
// }

// return keyboard
}

export async function sponsorButtons(ctx: Context){
  const userId = ctx.from.id;
  const chatButtons = Promise.all(config.chats.map(async (chat, i)=>{
    try {
      const user = await ctx.telegram.getChatMember(chat, userId)
      if(user.status !== 'member' && user.status !== 'creator' && user.status !== 'administrator'){
        const invite = await ctx.telegram.createChatInviteLink(chat)
        return Markup.button.url(`Спонсор ${i+1}`, invite.invite_link)
      }
    } catch(e){
      console.error(`Error getting chat info for chat ${chat}:`, e)
      return null;
    }
  }))

  return Markup.inlineKeyboard([
    ...(await chatButtons).filter((val)=>val)
  ])
}


export async function refButtons(ctx: Context){
  const invite = await ctx.telegram.createChatInviteLink(config.teamChat)
  return Markup.inlineKeyboard([
    Markup.button.url(`Основной канал`, invite.invite_link)
  ])
}
