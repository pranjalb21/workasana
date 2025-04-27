import connectDB from "./utils/db/db.connect.js";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const PORT = process.env.PORT || 3000;
const app = express();
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1/user", userRouter);

connectDB();

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});
