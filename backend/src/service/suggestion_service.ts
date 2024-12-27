import sequelize from "../config/database";
import { Sequelize } from 'sequelize-typescript';
import UnigeService from "./unige_service";
import Group from "../models/Group";



async function getSuggestedGroupsbyCourses(student_id : number){

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


export default getSuggestedGroupsbyCourses;