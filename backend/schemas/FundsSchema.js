const {Schema} = require("mongoose");

const FundsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        enum: ["Deposit", "Withdraw"]
    },
    amount: Number,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = FundsSchema;