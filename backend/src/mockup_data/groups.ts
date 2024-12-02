import { GroupMock } from"./models";
 
export const mockGroups = async () => {
await GroupMock.bulkCreate([
        { name: "Group A", course: "CSE", description: "This is a group for CSE students", members: 5, isPublic: true },
        { name: "Group B", course: "ECE", description: "This is a group for ECE students", members: 10, isPublic: false },
        { name: "Group C", course: "ME", description: "This is a group for ME students", members: 8, isPublic: true },
    ]);
};

export { GroupMock };
