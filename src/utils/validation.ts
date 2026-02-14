import { ScheduleAppointmentData } from "./types";

export const validateEmail = (value: string): string => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) return "Email required";
  if (!regex.test(value)) return "Invalid email";

  return "";
};

export const validatePassword = (value: string): string => {
  if (!value) return "Password required";
  if (value.length < 6) return "Minimum 6 characters";

  return "";
};

export const isOverlapping = (
  existing: ScheduleAppointmentData,
  requested: ScheduleAppointmentData
): boolean => {
  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };
  
  const existStart = toMinutes(existing.time);
  const existEnd = existStart + existing.duration;

  const reqStart = toMinutes(requested.time);
  const reqEnd = reqStart + requested.duration;

  return !(reqEnd <= existStart || reqStart >= existEnd);
};