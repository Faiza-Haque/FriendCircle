const { User, Thought } = require("../models");
module.exports = {
    // get all thoughts
    getThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get a single thought by id
    getThoughtById: async (req, res) => {
        try {
            const thoughtId = req.params.thoughtId;
            const thought = await Thought.findById(thoughtId);
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // create a new thought
    createThought: async (req, res) => {
        try {
            const thought = await Thought.create(req.body);
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // update a thought by id
    updateThought: async (req, res) => {
        try {
            const thoughtId = req.params.thoughtId
            const thought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // delete a thought by id
    deleteThought: async (req, res) => {
        try {
            const thoughtId = req.params.thoughtId
            await Thought.findByIdAndDelete(thoughtId);
            res.status(200).json({ message: "Thought deleted" });
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // add a reaction to a thought
    addReaction: async (req, res) => {
        try {
            const thoughtId = req.params.thoughtId
            const reaction = await Thought.findByIdAndUpdate(thoughtId, {
                $addToSet: {
                    reactions: req
                        .body
                }
            }, { new: true })
            res.status(200).json(reaction);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // remove a reaction from a thought
    removeReaction: async (req, res) => {
        try {
            const thoughtId = req.params.thoughtId
            const reactionId = req.params.reactionId
            const reaction = await Thought.findByIdAndUpdate(thoughtId, {
                $pull: {
                    reactions: reactionId
                }
            }, { new: true })
            res.status(200).json(reaction);
        } catch (err) {
            res.status(500).json(err)
        }
    }
}