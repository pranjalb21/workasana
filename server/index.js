import connectDB from "./utils/db/db.connect.js";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/tasks.route.js";
import teamRouter from "./routes/teams.route.js";
import projectRouter from "./routes/project.route.js";
import tagRouter from "./routes/tag.route.js";
import reportRouter from "./routes/report.route.js";

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
app.use(`/api/${process.env.API_VERSION}/projects`, projectRouter);
app.use(`/api/${process.env.API_VERSION}/tags`, tagRouter);
app.use(`/api/${process.env.API_VERSION}/reports`, reportRouter);


app.get("/", async(req,res)=>{
    res.status(200).json({message:"Welcome to Workasana Application."})
})

connectDB();

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});
