const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Home = new Schema(
    {
        houseInformation: { type: String, required: true },
        houseAddress: { type: Object, default: {} },
        aboutTheHome: { type: String, required: true },
        agentId: { type: Schema.Types.ObjectId, required: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Home", Home);