const mongoose = require("mongoose");

const publicationSchema = mongoose.Schema({
    userId: { type: String, required: true },
    commentaire: { type: String, required: true },
    image: { type: String, required: true },
    likes: { type: Number, required: true },
    usersLiked: { type: Array, required: true, default: Array },
    date: { type: String, required: true },
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    isLiked: { type: Boolean, required: false },
});

module.exports = mongoose.model("Publication", publicationSchema);
