import Group from '../models/Group';

interface GroupData {
    name: string;
    description: string;
    course: string;
    isPublic: boolean;
    membersLimit: number;
    telegramLink?: string; // camelCase, no need for telegram_link here
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
        telegramLink,
        adminId: studentId,
    });

    return group;
};

export default { createGroup };
