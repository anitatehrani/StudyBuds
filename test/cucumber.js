module.exports = {
    default: {
        require: ["steps/*.ts"],
        paths: ["features/6-create-a-group.feature"],
        requireModule: ["ts-node/register"],
    },
};