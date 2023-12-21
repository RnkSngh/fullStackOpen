import express from "express";
const app = express();
import diariesRouter from "./routes/diaries";
import cors from "cors";

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/ping", (_req, res) => {
  res.send("hello");
});

app.use("/api/diaries", diariesRouter);

app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`);
});
