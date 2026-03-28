const {Schema} = require("mongoose");

const OrdersSchema = new Schema({
    name: String,
    product: String,
    qty: Number,
    price: Number,
    mode: String,
    status: {
        type: String,
        enum: ["Passed", "Failed"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

module.exports=OrdersSchema;