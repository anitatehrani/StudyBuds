import StudentGroup from '../models/Group';
import sequelize from '../config/database'; 
import { QueryTypes } from 'sequelize'; 
const { ApiError, errorCodes } = require('../utils/response');

export async function getGroupById(groupId: number) {
    const data = await StudentGroup.findOne({
        where: {
            id: groupId
        }
    });
    return data;
}


export async function basicSearch(text, studentId) {
    try {
        const searchText = `%${text}%`;
        console.log(text + " .. "+studentId);
        const query = `
            SELECT 
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

