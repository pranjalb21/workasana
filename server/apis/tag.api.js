import Tag from "../models/tag.model.js";
import generateError from "../utils/generateError.js";
import tagSchema from "../utils/validators/tag.validator.js";

export const createTag = async (req, res) => {
    try {
        const parsedData = tagSchema.parse(req.body);
        const isExistingTag = await Tag.findOne({ name: parsedData.name });
        if (isExistingTag) {
            return res.status(409).json({ error: "Tag already exists." });
        }
        const newTag = await Tag.create(parsedData);

        return res
            .status(201)
            .json({ message: "Tag created successfully.", data: newTag });
    } catch (error) {
        // Combine all errors in an array
        const errors = generateError(error);

        // Return error response
        return res.status(500).json({
            error: "Error occured while creating tag.",
            message: errors,
        });
    }
};

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        return res
            .status(200)
            .json({ message: "Tags fetched successfully.", data: tags });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching tags.",
            message: error.message,
        });
    }
};
