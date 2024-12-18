module.exports = {
    default: {
        require: ["steps/*.ts"],
        paths: [process.env.FEATURE || "features/*.feature"],
        requireModule: ["ts-node/register"],
    },
};
