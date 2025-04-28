import { z } from "zod";

const tagSchema = z.object({
    name: z
        .string({ required_error: "Tag name is required." })
        .nonempty("Tag name cannot be empty."),
});
export default tagSchema;