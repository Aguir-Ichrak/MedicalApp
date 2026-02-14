import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Appointment } from "../../models/Appointment";
import { AddAppointmentPayload, StatusType, UpdateAppointmentPayload, appointmentsInitialState } from "../../utils/types";
import { isOverlapping } from "../../utils/validation";

// Fetch all appointments
export const fetchAppointments = createAsyncThunk<Appointment[], { token: string }, { rejectValue: string }>(
  "appointments/fetchAll",
  async ({ token }, thunkAPI) => {
    if (!token) return thunkAPI.rejectWithValue("Token missing");

    try {
      const snapshot = await getDocs(collection(db, "appointments"));

      const appointments: Appointment[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          patientName: data.patientName,
          doctorName: data.doctorName,
          date: data.date,
          time: data.time,
          duration: data.duration,
          note: data.note,
          status: data.status as StatusType,
        };
      });

      return appointments;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add new appointment
export const addAppointment = createAsyncThunk<Appointment, AddAppointmentPayload, { rejectValue: string }>(
  "appointments/add",
  async ({ appointment, token }, thunkAPI) => {
    try {
      if (!token) return thunkAPI.rejectWithValue("Token missing");

      const now = new Date();
      const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
      if (appointmentDate < now) {
        return thunkAPI.rejectWithValue("Appointment date cannot be in the past");
      }
      if (appointment.duration <= 0) {
        return thunkAPI.rejectWithValue("Duration must be greater than 0");
      }

      const q = query(
        collection(db, "appointments"),
        where("doctorName", "==", appointment.doctorName),
        where("date", "==", appointment.date),
        where("status", "==", "Scheduled")
      );
      const existing = await getDocs(q);

      for (const doc of existing.docs) {
        const data = doc.data() as Appointment;

        if (isOverlapping(data, appointment)) {
          return thunkAPI.rejectWithValue("Doctor is busy at this time");
        }
      }

      const docRef = await addDoc(collection(db, "appointments"), {
        ...appointment,
        status: "Scheduled",
      });

      return {
        id: docRef.id,
        ...appointment,
        status: "Scheduled",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete appointment
export const deleteAppointment = createAsyncThunk<
  string,
  { id: string; token: string },
  { rejectValue: string }
>(
  "appointments/delete",
  async ({ id, token }, thunkAPI) => {
    if (!token) return thunkAPI.rejectWithValue("Token missing");

    try {
      const docRef = doc(db, "appointments", id);
      await deleteDoc(docRef);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update appointment
export const updateAppointment = createAsyncThunk<
  Appointment,
  UpdateAppointmentPayload,
  { rejectValue: string }
>(
  "appointments/update",
  async ({ id, appointment, token }, thunkAPI) => {
    if (!token) return thunkAPI.rejectWithValue("Token missing");

    try {
      if (appointment.date && appointment.time) {
        const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
        const now = new Date();
        if (appointmentDate < now) {
          return thunkAPI.rejectWithValue("Appointment date cannot be in the past");
        }
      }
      if (appointment.duration !== undefined && appointment.duration <= 0) {
        return thunkAPI.rejectWithValue("Duration must be greater than 0");
      }

      if (appointment.doctorName || appointment.date || appointment.time || appointment.duration) {
        const q = query(
          collection(db, "appointments"),
          where("doctorName", "==", appointment.doctorName || ""),
          where("date", "==", appointment.date || ""),
          where("status", "==", "Scheduled")
        );
        const existing = await getDocs(q);

        for (const docSnap of existing.docs) {
          if (docSnap.id === id) continue;
          const data = docSnap.data() as Appointment;
          const tempAppointment: Appointment = {
            ...data,
            ...appointment,
          };
          if (isOverlapping(data, tempAppointment)) {
            return thunkAPI.rejectWithValue("Doctor is busy at this time");
          }
        }
      }

      const docRef = doc(db, "appointments", id);
      await updateDoc(docRef, appointment);

      return { id, ...appointment } as Appointment;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get appointment by ID
export const getAppointmentById = createAsyncThunk<
  Appointment,
  { id: string; token: string },
  { rejectValue: string }
>(
  "appointments/getById",
  async ({ id, token }, thunkAPI) => {
    if (!token) return thunkAPI.rejectWithValue("Token missing");

    try {
      const docRef = doc(db, "appointments", id);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        return thunkAPI.rejectWithValue("Appointment not found");
      }

      const data = snapshot.data();

      return {
        id: snapshot.id,
        patientName: data.patientName,
        doctorName: data.doctorName,
        date: data.date,
        time: data.time,
        duration: data.duration,
        note: data.note,
        status: data.status as "Scheduled" | "Completed" | "Cancelled",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: appointmentsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(addAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((a) => a.id !== action.payload);
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload };
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(getAppointmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAppointment = action.payload;
      })
      .addCase(getAppointmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

  },
});

export default appointmentsSlice.reducer;