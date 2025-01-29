import TelegramBot from "node-telegram-bot-api";
import { removeUserFromGroup } from "../service/group_member";

function assert(condition: boolean, msg: string): asserts condition {
  if (!condition) {
    console.error(msg);
    process.exit(1);
  }
}

const token = process.env["TELEGRAM_TOKEN"];
assert(token !== undefined, "TELEGRAM_TOKEN environment variable not present");
const bot = new TelegramBot(token, { polling: true });

function suppressErrors<T>(
  f: (_: T) => Promise<void>,
): (_: T) => Promise<void> {
  return async (msg) => {
    try {
        return await f(msg);
    } catch (e) {
      console.error("Error handling telegram message:",e);
    }
  };
}

bot.on(
  "left_chat_member",
  suppressErrors(async (msg) => {
    console.log("A user left the group:", msg);
    const chat = msg["chat"];
    let isGroup = chat.type === "group" || chat.type === "supergroup";
    if (!isGroup) return;
    console.log("chat is a group");
    const groupId = chat.id;
    const member = msg["left_chat_member"];
    assert(member !== undefined, "");
    const userId = member.id;
    await bot.sendMessage(
      chat.id,
      `User with ID ${userId} has left the group with ID ${groupId}`,
    );
    //call the function to remove the user from the group
    const result = await removeUserFromGroup(userId, groupId);
    if (result.success) {
      await bot.sendMessage(
        chat.id,
        `User with ID ${userId} has successfully been removed from ${groupId} Group`,
      );
    } else {
      await bot.sendMessage(chat.id, "Error removing user from the group");
    }
  }),
);

bot.onText(
    /\/start/,
    suppressErrors(async (msg) => {
      console.log("Received start command:", msg);
      const chat = msg.chat;
      const chatId = chat.id;
      if (chat.type === "group") {
        const me = await bot.getMe();
        const botId = me.id;
        const chatMember = await bot.getChatMember(chatId, botId);
        console.log("Chat member object:", chatMember);
        const isAdmin = chatMember.status === "administrator";
        if (!isAdmin) {
          await bot.sendMessage(chatId, "Error, the bot is not an admin");
          return;
        }
      }
      const escapeChatId = String(chatId).replace(/([_*\[\]()~`>#\+\-=|{}.!])/g, '\\$1');
      await bot.sendMessage(chatId, `Welcome\\! Your Telegram ID is \`${escapeChatId}\``, { 
          parse_mode: "MarkdownV2",
       });
  })
);


export async function getJoinLink(groupId: number) {
  try {
    const inviteLink = await bot.createChatInviteLink(groupId);
    return inviteLink.invite_link;
  } catch (error) {
    console.error("Failed to create chat invite link:", error);
    throw new Error("Failed to create chat invite link");
  }
}

bot.onText(
  /\/join/,
  suppressErrors(async (msg) => {
    await bot.sendMessage(
      msg.chat.id,
      `Link: ${await getJoinLink(msg.chat.id)}`,
    );
  }),
);
