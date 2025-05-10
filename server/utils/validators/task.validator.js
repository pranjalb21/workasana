import { array, z } from "zod";

const taskSchema = z.object({
    name: z
        .string({ required_error: "Task name is required." })
        .nonempty("Task name can not be empty."),
    project: z
        .string({ required_error: "Project name is required." })
        .nonempty("Project name cannot be empty."),
    team: z
        .string({ required_error: "Team ID is required." })
        .regex(/^[0-9a-fA-F]{24}$/, {
            message: "Invalid Mongoose ObjectId",
        }),
    owners: z.array(
        z
            .string({ required_error: "Team ID is required." })
            .regex(/^[0-9a-fA-F]{24}$/, {
                message: "Invalid Mongoose ObjectId",
            })
            .min(1, { message: "Atleast 1 Owner is required." })
    ),
    tags: z
        .array(z.string({ required_error: "Tag is required." }))
        .min(1, { message: "Atleast 1 Owner is required." }),
    timeToComplete: z
        .string({ required_error: "Completion day is required" })
        .min(1, { message: "Invalid completion day." }),
    status: z
        .enum(["To Do", "In Progress", "Completed", "Blocked"])
        .describe(
            "Allowed values: 'To Do', 'In Progress', 'Completed', 'Blocked'."
        ),
    priority: z
        .enum(["Low", "High", "Medium"])
        .describe("Allowed values: 'Low', 'High', 'Medium'."),
});
export default taskSchema;
