import diagnoses from '../data/diagnoses';
import { DiagnoseEntry } from '../types';


const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses
};