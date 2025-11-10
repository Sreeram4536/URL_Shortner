import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRouter from "./routes/authRoutes";
import urlRouter from "./routes/urlRoutes";
import publicRoute from "./routes/publicRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/auth', authRouter);
app.use('/api/url',urlRouter)
app.use('/',publicRoute)

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Running on PORT ${PORT}`))