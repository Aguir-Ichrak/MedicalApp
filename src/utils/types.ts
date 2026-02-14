import { Appointment, NewAppointment } from "../models/Appointment";
import { User } from "../models/User";

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  AddAppointment: undefined;
  EditAppointment: { appointmentId: string };
};

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

export const UserInitialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export interface AppointmentForm {
  id?: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  duration: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  note?: string;
}

export interface AppointmentsState {
  list: Appointment[];
  selectedAppointment: Appointment | null;
  loading: boolean;
  error: string | null;
}

export const appointmentsInitialState: AppointmentsState = {
  list: [],
  selectedAppointment: null,
  loading: false,
  error: null,
};

export interface AddAppointmentPayload {
  appointment: NewAppointment;
  token: string;
}

export interface UpdateAppointmentPayload {
  id: string;
  appointment: Partial<Appointment>; 
  token: string;
}

export interface ScheduleAppointmentData {
  time: string;
  duration: number;
}

export type StatusType = "Scheduled" | "Completed" | "Cancelled";
export const statusOptions: StatusType[] = ["Scheduled", "Completed", "Cancelled"];