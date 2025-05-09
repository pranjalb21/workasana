import { z } from "zod";

const teamSchema = z.object({
    name: z
        .string({ required_error: "Team name is required." })
        .nonempty("Project name can not be empty."),
    description: z
        .string({ required_error: "Project description is required." })
        .nonempty("Project description cannot be empty."),
    members: z.array(
        z
            .string({ required_error: "User is required." })
            .regex(/^[0-9a-fA-F]{24}$/, {
                message: "Invalid User",
            })
            .min(1, { message: "Atleast 1 user is required." })
    ),
});
export default teamSchema;
