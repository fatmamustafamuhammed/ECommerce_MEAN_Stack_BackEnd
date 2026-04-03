import express from "express";
const router = express.Router();
import { RegisterUser, LoginUser } from "../handlers/auth-handler.js";

router.post("/register", async (req, res) => {
  let model = req.body;
  if (model.name && model.email && model.password) {
    // register
    await RegisterUser(model);
    res.send({ message: "User Registered" });
  } else {
    res.status(400).json({ error: "Please provide Name, Email and Password" });
  }
});

router.post("/login", async (req, res) => {
  let model = req.body;
  if (model.email && model.password) {
    // login
    const result = await LoginUser(model);
    if (result) {
      res.send(result);
    } else {
      res.status(400).json({ error: "Email or Password is inCorrect" });
    }
  } else {
    res.status(400).json({ error: "Please provide Email and Password" });
  }
});

export default router;
