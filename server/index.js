import connectDB from "./utils/db/db.connect.js";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import teamRouter from "./routes/teams.routes.js";

const PORT = process.env.PORT || 3000;
const app = express();
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(`/api/${process.env.API_VERSION}/auth`, userRouter);
app.use(`/api/${process.env.API_VERSION}/tasks`, taskRouter);
app.use(`/api/${process.env.API_VERSION}/teams`, teamRouter);

connectDB();

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});
