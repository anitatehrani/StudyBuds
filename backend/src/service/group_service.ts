import Group from '../models/Group';

interface GroupData {
    name: string;
    description: string;
    course: string;
    isPublic: boolean; // Use isPublic to indicate group type
    membersLimit: number;
    telegramLink?: string; // camelCase for TypeScript
    studentId: number;
}

export const createGroup = async (groupData: GroupData): Promise<Group> => {
    const { name, description, course, isPublic, membersLimit, telegramLink, studentId } = groupData;

    // Save the group information in the database
    const group = await Group.create({
        name,
        description,
        course,
        isPublic,
        membersLimit,
        telegramLink, // Sequelize automatically maps this to "telegram_link"
        adminId: studentId,
    });

    return group;
};

export default { createGroup };
