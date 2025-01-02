import { Markup } from "telegraf";

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
