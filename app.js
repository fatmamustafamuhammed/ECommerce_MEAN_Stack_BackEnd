import express from "express";
import mongoose from "mongoose";
import categoryRoutes from "./routes/category.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/category", categoryRoutes);
console.log("Category routes registered");

app.get("/", (req, res) => {
  res.send("Server running");
});

async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "e-comm-store-db",
  });
  console.log("mongodb connected");
}

connectDb().catch((err) => {
  console.error(err);
});

app.listen(port, () => {
  console.log("Server is Running on Port", port);
});
