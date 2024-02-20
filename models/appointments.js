const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Appointment = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        date: { type: Number, required: true },
        time: { type: Number, required: true },
        interestedHome: { type: Array, default: [] },
        notes: { type: String, default: "" },
        agentId: { type: Schema.Types.ObjectId, required: false, default: null },
        homeId: { type: Schema.Types.ObjectId, required: false, default: null },
        customerId: { type: Schema.Types.ObjectId, required: false, default: null }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Appointment", Appointment);