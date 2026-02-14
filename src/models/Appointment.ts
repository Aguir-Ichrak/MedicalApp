import { StatusType } from "../utils/types";

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  note?: string;
  status: StatusType;
}

export interface NewAppointment {
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  note?: string;
  status: StatusType;
}
