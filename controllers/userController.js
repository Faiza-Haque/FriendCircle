const { User, Thought } = require("../models");
module.exports = {
    // get all users
    async getAllUsers(req, res) {
        const users = await User.find();
        res.json(users);

    },
    // get a single user by id
    async getUserById(req, res) {
        const userId = req.params.userId;
        const user = await User.findOne({
            _id: userId
        });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user)
    },
    //create a user
    async createUser(req, res) {

        const user = await User.create(req.body);
        res.json(user);
    },
    //update a user
    async updateUser(req, res) {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    },
    //delete a user
    async deleteUser(req, res) {
        const userId = req.params.userId;
        await User.findOneAndDelete({ _id: userId });
        res.send ("user has been removed")

    },
    //add friend
    async addFriend(req, res) {
        const userId = req.params.userId;
        const friendId = req.params.friendId;
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { friends: friendId } },
            { new: true }
        )
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return
        }
        res.json(user);
    },
    //remove friend
    async removeFriend(req, res) {
        const userId = req.params.userId;
        const friendId = req.params.friendId;
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId } },
            { new: true }
        )
        res.json(user);
    }
}