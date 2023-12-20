import express from "express";
import patientServices from "../services/patientServices";
import { toNewPatientEntry } from "../utils";
import { NewPatient, Patient } from "../../types";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientServices.getAllNonSensitivePatients());
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatientEntry(req.body as unknown);
    const addedPatient: Patient = patientServices.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send({ error: e.message });
    }
  }
});

export default patientsRouter;
