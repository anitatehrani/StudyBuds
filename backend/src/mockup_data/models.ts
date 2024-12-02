import SequelizeMock from "sequelize-mock";
 
const dbMock = new SequelizeMock();
 
export const GroupMock = dbMock.define("Group", {
    name: "Default Group",
    course: "Default Course",
    description: "Default Description",
    members: 0,
    isPublic: true,
});
 
export const StudentMock = dbMock.define("Student", {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
});
 
export default dbMock;