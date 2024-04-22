import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    message: {
        type: String,
    },

    sender: {
        type: String,
        required: true
    },

    media: {
        type: Array
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;