import {v1 as uuid} from 'uuid'
import patients from '../data/patients';
import {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
  NewEntry,
} from '../types';
const id = uuid()


const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = ( id: string ): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = ( patient: Patient, newEntry: NewEntry ): Patient => {
  const entry = {
    id: id,
    ...newEntry
  };
  const updatedPatient = {
    ...patient,
    entries: patient.entries?.concat(entry)
  };
  const patientIndex = patients.indexOf(patient);
  patients.splice(patientIndex, 1, updatedPatient);

  return updatedPatient;
};

export default {
  getPatients,
  addPatient,
  addEntry,
  getNonSensitivePatientEntries,
  findById
};