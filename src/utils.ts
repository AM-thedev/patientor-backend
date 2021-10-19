import { 
  NewPatientEntry, 
  Gender, 
  NewEntry,
  Discharge,
  HealthCheckRating,
  SickLeave
} from "./types";


const isString = (text: unknown): text is string => {
  //two ways to check for string, respecting JS' two
  // different ways of creating strings:
  // const a = "string" vs const b = new String("string object")
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
}

const parseDoB = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing social security number');
  }

  return ssn;
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender' + gender);
  }
  return gender;
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
}

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown }
// an alternative to Fields is...
// const toNewPatientEntry = (object: any)... <-disable eslint complaint
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : PatientFields): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDoB(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  }

  return newPatient
}

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing text');
  }

  return text;
}

const isDischarge = (discharge: any): boolean => {
  return (
    discharge.date &&
    discharge.criteria &&
    isDate(discharge.date) &&
    isString(discharge.criteria)
  );
};
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

const isHealthCheckRating = (healthCheckRating: any): boolean => {
  return (
    Object.values(HealthCheckRating).includes(healthCheckRating)
  );
};
const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheckRating;
};

const isSickLeave = (sickLeave: any): boolean => {
  return (
    sickLeave.startDate &&
    sickLeave.endDate &&
    isDate(sickLeave.startDate) &&
    isDate(sickLeave.endDate)
  )
};
const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
  }
  return sickLeave;
};

const assertNever = (value: never, title: string): never => {
  throw new Error(
    `Unhandled discriminated union member from ${title}: ${JSON.stringify(value)}`
  );
};

const toNewEntry = (object: any): NewEntry => {
  const newEntry = object as NewEntry;
  console.log("Before: ", object);
  console.log("After", newEntry);

  switch (newEntry.type) {
    case "Hospital":
      newEntry.discharge = parseDischarge(object.discharge);
      return newEntry
    case "HealthCheck":
      newEntry.healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
      return newEntry
    case "OccupationalHealthCare":
      newEntry.employerName = parseString(object.employerName);
      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }
      return newEntry;
    default:
      return assertNever(newEntry, "backend toNewEntry");
  }
};


export {
  toNewPatientEntry,
  toNewEntry
};