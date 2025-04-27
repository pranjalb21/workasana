import mongoose from "mongoose";
import { hashPassword } from "../utils/passwordOperations.js";

// User Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        }, // User's name
        email: {
            type: String,
            required: true,
            unique: true,
        }, // Email must be unique
        password: {
            type: String,
            required: true,
        }, // User password
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await hashPassword(this.password);
        // console.log(this.password);
    }
});

const User = mongoose.model("User", userSchema);
export default User;
