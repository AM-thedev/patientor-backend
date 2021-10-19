import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils'


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries())
})

router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient)
  } catch (e : any) {
    res.status(400).send(e.message)
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);
    if (!patient) {
      throw new Error("Patient not found");
    }
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(patient, newEntry);
    res.json(updatedPatient);
  } catch (e : any) {
    res.status(400).send(e.message)
  }
});


export default router;