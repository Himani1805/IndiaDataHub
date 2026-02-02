import mongoose from "mongoose";
import config from "./config.js"

async function connectDB() {
    // console.log("Mongo URI", MONGO_URI)
    try {
        // Access MONGO_URI from the config object
        await mongoose.connect(config.MONGO_URI)
        console.log("Coonected to mongoDB")
    } catch (error) {
        console.log("Mongodb connection error", error)
        process.exit(1);
    }
}

export { connectDB };
