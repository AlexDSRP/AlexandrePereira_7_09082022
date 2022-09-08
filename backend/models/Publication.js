const mongoose = require("mongoose");

const publicationSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: Array, required: true, default: Array },
    usersDisliked: { type: Array, required: true, default: Array },
});

module.exports = mongoose.model("Publication", publicationSchema);
