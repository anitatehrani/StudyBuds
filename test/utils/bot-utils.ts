import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

export async function isUserInGroup(userId: string, groupId: string): Promise<boolean> {
    try {
        console.log(`Checking if user ${userId} is in group ${groupId}...`);
        
        const response = await axios.get(
            `${TELEGRAM_API_BASE}/getChatMember`,
            {
                params: {
                    chat_id: groupId,
                    user_id: userId,
                },
            }
        );

        console.log("Response:", response.data);
        
        // Check if the user is a member of the group
        const { status } = response.data.result;
        return ["member", "administrator", "creator"].includes(status);
    } catch (error) {
        console.log("Error:", error);
        
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        throw new Error("Failed to verify if the user is in the group.");
    }
}

export async function getGroupTitleFromBot(groupId: string): Promise<string> {
    try {
        console.log(`Getting group title for group ${groupId}...`);
        
        const response = await axios.get(
            `${TELEGRAM_API_BASE}/getChat`,
            {
                params: {
                    chat_id: groupId,
                },
            }
        );

        console.log("Response:", response.data);
        
        //get the title of the group
        const title = response.data.result.title;
        return title;
    } catch (error) {
        console.log("Error:", error);
        
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        throw new Error("Failed to get the group title.");
    }
}
