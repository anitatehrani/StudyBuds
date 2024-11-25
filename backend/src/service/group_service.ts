import { QueryTypes } from 'sequelize';
import sequelize from '../config/database';
import Group from '../models/Group';
const { ApiError, errorCodes } = require('../utils/response');

interface GroupData {
    name: string;
    description?: string;
    course: string;
    isPublic: boolean;
    membersLimit: number;
    telegramLink?: string;
    adminId: number; // Maps studentId to adminId
}

export async function getGroupById(groupId: number) {
    const data = await Group.findOne({
        where: {
            id: groupId
        }
    });
    return data;
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


export async function basicSearch(text, studentId) {
    try {
        const searchText = `%${text}%`;
        console.log(text + " .. "+studentId);
        const query = `
            SELECT
                sg.id, 
                sg.name,
                sg.description,
                sg.is_public,
                sg.course,
                COUNT(gm.student_id) AS member_count,
                jr.status
            FROM 
                studybuds.student_group sg
            LEFT JOIN 
                studybuds.group_members gm ON sg.id = gm.group_id
            LEFT JOIN 
                studybuds.join_request jr ON sg.id = jr.group_id AND jr.student_id = :studentId
            WHERE 
                sg.name ILIKE :searchText
                OR sg.description ILIKE :searchText
                OR sg.course ILIKE :searchText
            GROUP BY 
                sg.id, 
                sg.name, 
                sg.description, 
                sg.is_public,
                sg.course,
                jr.status
            ORDER BY 
                member_count DESC;
        `;
const results = await sequelize.query(query, {
    replacements: { searchText, studentId },
    type: QueryTypes.SELECT,
});
        return results;
    } catch (error) {
        console.error(`Failed to execute basic search. Error: ${error.message}`);
        throw new ApiError({
            code: errorCodes.internalServerErrorCode,
            message: 'Failed to execute basic search.',
        });
    }
}


export default {
    createGroup,
    basicSearch,
};
