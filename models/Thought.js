const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {
    toJSON: {
        getter: true,
    },
    id: false,
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLenght: 280,

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: date => new Date(date).toLocaleString()
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]

}, {
    toJSON: {
        virtuals: true,
        getter: true,
    },
    id: false,
});
thoughtSchema.virtual("reactionCount")
    .get(function () {
        return this.reactions.length;
    });
const Thought = model('Thought', thoughtSchema);
module.exports = Thought 