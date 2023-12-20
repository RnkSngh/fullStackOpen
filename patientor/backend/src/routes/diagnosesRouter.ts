import express from "express";
const diagnosesRouter = express.Router();
import diagnosisServices from "../services/diagnosisServices";

diagnosesRouter.get("/", (_req, res) => {
  res.send(diagnosisServices.getAllDiagnoses());
});

export default diagnosesRouter;
