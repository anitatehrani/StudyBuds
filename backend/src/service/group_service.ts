import Group from '../models/Group';

interface GroupData {
    name: string;
    description?: string;
    course: string;
    isPublic: boolean;
    membersLimit: number;
    telegramLink?: string;
    adminId: number; // Maps studentId to adminId
}

export const createGroup = async (groupData: GroupData): Promise<Group> => {
    const { name, description, course, isPublic, membersLimit, telegramLink, adminId } = groupData;

    const group = await Group.create({
        name,
        description,
        course,
        isPublic,
        membersLimit,
        telegramLink,
        adminId,
    });

    return group;
};

export default createGroup;
