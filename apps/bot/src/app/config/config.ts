import { ConfigProps } from "../../interfaces/config.interfaces";

const createConfig = ():ConfigProps => ({
  chats: process.env.chats.split('|').map((chat)=>parseInt(chat)),
  teamChat: process.env.teamChat,
 });

export const config = createConfig()

