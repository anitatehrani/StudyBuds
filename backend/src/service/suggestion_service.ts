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

/*
friend: a person in the same group as me
take people inside my groups
take groups of those people
add 1 to each of these groups

*/

export async function getSuggestedGroupsbyFriends(student_id: number): Promise<PopularityResult[]> {

    const query = `
      SELECT group_id, count(*) as tot
      FROM studybuds.group_members
      WHERE student_id in
      (
        SELECT  DISTINCT student_id
        FROM studybuds.group_members
        WHERE group_id in 
        (
            SELECT DISTINCT group_id 
            FROM studybuds.group_members
            WHERE student_id=:student_id
        )
        AND student_id not in (:student_id)
      )
      GROUP BY group_id ORDER BY tot DESC
    `;
    try {
        const results = await sequelize.query<PopularityResult[]>(query, {
            replacements: { student_id },
            type: QueryTypes.SELECT,
        });
        return results;
    } catch (error) {
        console.error(`Failed to execute get suggested groups by friends. Error: ${error.message}`);
        throw error;
    }

}


export default getSuggestedGroupsbyCourses;