import StudentGroup from '../models/Group';

export async function getGroupById(groupId: number) {
    const data = await StudentGroup.findOne({
        where: {
            id: groupId
        }
    });
    return data;
}