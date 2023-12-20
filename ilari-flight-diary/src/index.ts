import express from "express";
const app = express();
import diariesRouter from "./routes/diaries";

app.use(express.json());

const PORT = 3001;

app.get("/ping", (_req, res) => {
  res.send("hello");
});

app.use("/api/diaries", diariesRouter);

app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`);
});
