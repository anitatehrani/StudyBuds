import TelegramBot from "node-telegram-bot-api";

function assert(condition: boolean, msg: string): asserts condition {
    if (!condition) {
        console.error(msg);
        process.exit(1);
    }
}

const token = process.env["TELEGRAM_TOKEN"];
assert(token !== undefined, "TELEGRAM_TOKEN environment variable not present");
const bot = new TelegramBot(token, { polling: true });

async function removeUserFromGroup(telegramUserId: number, telegramGroupId: number) {}

bot.on("left_chat_member", async (msg) => {
    console.log("A user left the group:", msg);
    const chat = msg["chat"];
    if (chat.type !== "group") return;
    const groupId = chat.id;
    const member = msg["left_chat_member"];
    assert(member !== undefined, "");
    const userId = member.id;
    await removeUserFromGroup(userId, groupId);
    console.log("Removed user", userId, "from group", groupId);
});

bot.onText(/\/start/, async (msg) => {
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
    await bot.sendMessage(chatId, `Welcome! Your Telegram ID is ${chatId}`);
});

export async function getJoinLink(groupId: number) {
    try {
        const inviteLink = await bot.createChatInviteLink(groupId);
        return inviteLink.invite_link;
    } catch (error) {
        console.error("Failed to create chat invite link:", error);
        throw new Error("Failed to create chat invite link");
    }
}

bot.onText(/\/join/, async (msg) => {
    await bot.sendMessage(msg.chat.id, `Link: ${await getJoinLink(msg.chat.id)}`);
});
