import SequelizeMock from "sequelize-mock";
import { groupsData } from "./groups";

export const dbMock = new SequelizeMock();

//GROUPS

const GroupMock = dbMock.define("Group", {
    name: "Default Group",
    course: "Default Course",
    description: "Default Description",
    members: 0,
    isPublic: true,
});

groupsData.forEach((data) => GroupMock.build(data));

export function findGroupsByNameContains(substring) {
    const filteredData = groupsData.filter((group) =>
        group.name.toLowerCase().includes(substring.toLowerCase())
    );

    return Promise.resolve(filteredData.map((data) => GroupMock.build(data)));
}

export function findAllGroups() {
    return Promise.resolve(groupsData.map((data) => GroupMock.build(data)));
}

export const StudentMock = dbMock.define("Student", {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
});

export default dbMock;
