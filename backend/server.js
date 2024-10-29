import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running: http://localhost:${port}/`);
});
