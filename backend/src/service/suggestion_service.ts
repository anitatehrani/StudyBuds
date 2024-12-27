import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { Sequelize } from 'sequelize-typescript';
import UnigeService from "./unige_service";
import Group from "../models/Group";
import { PopularityResult } from "./group_service";




async function getSuggestedGroupsbyCourses(student_id: number) {

    const student_info = await UnigeService.getUnigeProfile(student_id);

    const courses = student_info.courses;

    const data = await Group.findAll({
        where: {
            course: {
                [Sequelize.Op.iLike]: {
                    [Sequelize.Op.any]: courses,
                },
            },
        },
    });

    return data;
}


export async function getSuggestedGroupsbyPopularity(): Promise<PopularityResult[]> {

    const query = `
      REFRESH MATERIALIZED VIEW studybuds.group_popularity;
      SELECT  *
      FROM studybuds.group_popularity;
    `;
    try {
        const results = await sequelize.query<PopularityResult[]>(query, {
            type: QueryTypes.SELECT,
        });
        return results;
    } catch (error) {
        console.error(`Failed to execute basic search. Error: ${error.message}`);
        throw error;
    }

}


export default getSuggestedGroupsbyCourses;