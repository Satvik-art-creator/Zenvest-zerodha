require("dotenv").config({ path: "../.env" });
const mongoose=require("mongoose")
const {positions, holdings, watchlist} = require("./data.js")
const HoldingsModel = require("../models/HoldingsModel.js")
const PositionsModel = require("../models/PositionsModel.js")
// const OrdersModel = require("../models/OrdersModel.js")

const uri=process.env.MONGO_URL;

const main = async () => {
    await mongoose.connect(uri);
}

main()
    .then(()=>console.log("Connection Successful"))
    .catch((err)=>console.log(err));


const initData = async () => {
    //deleting data
    await PositionsModel.deleteMany({});
    await HoldingsModel.deleteMany({});

    //inserting initial data
    await PositionsModel.insertMany(positions);
    await HoldingsModel.insertMany(holdings);
}

initData();