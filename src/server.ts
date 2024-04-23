import express from "express";
import { DbConnection } from "./dbconfig/dbConnect";
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.get("/", async (req, res) => {
  await DbConnection();
  res.send("Hello, World!");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  await DbConnection();
  res.json({ requestData: { username, password } });
  console.log(username, password);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
