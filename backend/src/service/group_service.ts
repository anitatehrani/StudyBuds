import Group from '../models/Group';

export async function getGroup(groupId: number) {
    const data = await Group.findOne({
        where: {
            id: groupId
        }
    });
    return data;
}