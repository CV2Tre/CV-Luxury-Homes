const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Customer = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Customer", Customer);