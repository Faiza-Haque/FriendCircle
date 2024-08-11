const db = require("../config/connection");
const { User, Thought } = require("../models");
const userSeed = [
    {
        username: "faizaDoe",
        email: "faiza.doe@example.com",
        thoughts: [],
        friends: []
    },
    {
        username: "jillSmith",
        email: "jill.smith@example.com",
        thoughts: [],
        friends: []
    },
    {
        username: "tranNguyen",
        email: "tran.nguyen@example.com",
        thoughts: [],
        friends: []
    }
];
const thoughtSeed = [
    {
        thoughtText: "This is a great thought!",
        username: "faizaDoe",
        reactions: []
    },
    {
        thoughtText: "Here's another interesting thought.",
        username: "jillSmith",
        reactions: []
    },
    {
        thoughtText: "Great!",
        username: "tranNguyen",
        reactions: []
    }
];
db.once("open", async () => {
    try {
        // Clear the database
        await User.deleteMany({});
        await Thought.deleteMany({});
        // Insert users
        const users = await User.insertMany(userSeed);
        // Insert thoughts and update users with thought references
        for (let i = 0; i < thoughtSeed.length; i++) {
            const thought = await Thought.create(thoughtSeed[i]);
            await User.findOneAndUpdate(
                { username: thought.username },
                { $push: { thoughts: thought._id } }
            );
        }
        console.log("Data successfully seeded!");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding data: ", err);
        process.exit(1);
    }
});