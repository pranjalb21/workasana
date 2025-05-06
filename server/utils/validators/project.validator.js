import { z } from "zod";

const projectSchema = z.object({
    name: z
        .string({ required_error: "Project name is required." })
        .nonempty("Project name can not be empty."),
    description: z
        .string({ required_error: "Project description is required." })
        .nonempty("Project description cannot be empty."),
    status: z.enum(["In Progress", "Completed"]),
    owner: z.string({ required_error: "Project owner is required." }),
});
export default projectSchema;
