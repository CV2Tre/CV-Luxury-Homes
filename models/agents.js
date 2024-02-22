const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Agent = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        headshotImgPath: { type: String, required: false, default: "" },
        properties: { type: Array, required: false, default: [] }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Agent", Agent);
