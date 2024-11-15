import { getGroupById } from '../service/group_service';
import { getStudentById } from '../service/student_service';
import JoinRequest from '../models/JoinRequest';
import GroupMembers from '../models/GroupMembers';

export const joinTheGroup = async (req, res) => {
    try {
        const { studentId, groupId } = req.body;

        if (!studentId || !groupId) {
            return res.status(400).send('studentId and groupId are required.');
        }

        const student = await getStudentById(studentId);
        if (!student) {
            return res.status(404).send('Student not found.');
        }


        if (!student.telegramAccount) {
            return res.status(400).send('Student has not linked their Telegram account.');
        }

        const group = await getGroupById(groupId);
        if (!group) {
            return res.status(404).send('Group not found.');
        }

      /*  const memberCount = await countGroupMember(groupId);
        if (memberCount >= group.membersLimit) {
            return res.status(400).send('The group has reached its member limit.');
        }*/

       /* if (group.isPublic) {
            await GroupMembers.create({ groupId, studentId });
            return res.status(200).send('Student added to the group successfully.');
        } else {
            await JoinRequest.create({
                groupId,
                studentId,
                status: 'Pending',
            });
            return res.status(200).send('Join request submitted successfully.');
        }*/
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error.');
    }
};
