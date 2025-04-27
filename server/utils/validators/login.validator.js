import {z} from "zod";

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email ID is required." })
        .trim()
        .nonempty("Email ID cannot be empty.")
        .email("Invalid email ID.")
        .toLowerCase(),
    password: z
        .string({ required_error: "Password is required." })
        .nonempty("Password cannot be empty.")
        .min(5, { message: "Password must be atleast 5 characters." })
        .max(15, { message: "Password can't be more than 15 characters." }),
});
export default loginSchema;
