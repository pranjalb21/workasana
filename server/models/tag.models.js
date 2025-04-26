import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        }, // Tag names must be unique
    },
    {
        timestamps: true,
    }
);
const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
