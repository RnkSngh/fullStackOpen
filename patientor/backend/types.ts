export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type NewPatient = Omit<Patient, "id">;
export type NonSensitivePatient = Omit<Patient, "ssn">;
