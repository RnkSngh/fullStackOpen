import express from "express";
import cors from "cors";
const app = express();
import diagnosesRouter from "./routes/diagnosesRouter";
import patientsRouter from "./routes/patientsRouter";

app.use(express.json());
app.use(cors());

const PORT = 3001;
app.get("/api/ping", (_req, res) => {
  res.send("hello");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
