import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const uri = process.env.MONGO_URI;
const connectDB = async () => {
    // console.log(uri);
    await mongoose
        .connect(uri)
        .then(() => console.log("DB connected successfully."))
        .catch(() => console.log("Unable to connect DB."));
};
export default connectDB