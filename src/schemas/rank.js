const mongoose = require("mongoose");

module.exports = function Rank() {
    return new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        role_id: {
            type: Number,
            required: true,
        },
        priority: {
            type: Number,
            required: true,
        }
    });
}