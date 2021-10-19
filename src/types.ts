export enum Gender {
  Other = 'other',
  Male = 'male',
  Female = 'female'
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export type NewBaseEntry = Omit<BaseEntry, "id">

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthCare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export type Entry =
    HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

export type NewEntry = 
    Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthCareEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}
export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
