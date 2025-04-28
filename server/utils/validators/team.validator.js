import { z } from "zod";

const teamSchema = z.object({
    name: z
        .string({ required_error: "Team name is required." })
        .nonempty("Project name can not be empty."),
    description: z
        .string({ required_error: "Project description is required." })
        .nonempty("Project description cannot be empty."),
});
export default teamSchema;
