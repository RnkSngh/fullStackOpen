import { Gender, NewPatient } from "../types";

const isString = (s: unknown): s is string => {
  return typeof s === "string" || s instanceof String;
};

const isDate = (d: unknown): boolean => {
  return isString(d) && Boolean(Date.parse(d));
};

const isGender = (gender: string): gender is Gender => {
  return Object.keys(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("name is not valid format" + name);
  }
  return name;
};

const parseDateOfBirth = (dob: any): string => {
  if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error(`Date is not valid, ${dob}`);
  }
  return dob;
};

const parseSSN = (ssn: any): string => {
  return parseName(ssn);
};

const parseOccupation = (occupation: any): string => {
  return parseName(occupation);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Gender format is invalid" + gender);
  }

  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Object missing params");
  }

  if (
    "gender" in object &&
    "ssn" in object &&
    "dateOfBirth" in object &&
    "name" in object &&
    "occupation" in object
  ) {
    return {
      gender: parseGender(object.gender),
      ssn: parseSSN(object.ssn),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      name: parseName(object.name),
      occupation: parseOccupation(object.occupation),
    };
  }
  throw new Error("invalid data");
};

export { toNewPatientEntry };
