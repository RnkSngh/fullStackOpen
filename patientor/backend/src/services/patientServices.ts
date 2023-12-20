import patients from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../../types";
import { v1 as uuid } from "uuid";

const getAllPatients = (): Patient[] => patients;

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map((patient) => {
    const { ssn, ...nonSensitivePatient } = patient;
    return nonSensitivePatient;
  });
};

const addNewPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuid() };
  patients.push(newPatient);
  return newPatient;
};

export default { getAllPatients, getAllNonSensitivePatients, addNewPatient };
