import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../services/store";
import { addAppointment } from "../services/slices/appointmentsSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormInput } from "../components/FormInput";
import { COLORS, STYLE } from "../utils/constants";
import { getAuth } from "firebase/auth";
import DateInput from "../components/DateInput";
import { Navbar } from "../components/Navbar";
import { logout } from "../services/slices/authSlice";
import TimePickerInput from "../components/TimePickerInput";
import { AppointmentForm } from "../utils/types";

export default function AddAppointmentScreen({ navigation }: any) {
  const [userToken, setUserToken] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<AppointmentForm>({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    duration: "",
    status: "Scheduled",
    note: "",
  });

  useEffect(() => {
    const fetchToken = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error("User not logged in");
        return;
      }
      const token = await user.getIdToken();
      setUserToken(token);
    };

    fetchToken();
  }, []);

  const handleLogoPress = () => {
    navigation.navigate('Dashboard' as never);
  };

  const handleSubmit = async () => {
    if (!userToken) {
      Alert.alert("Error", "User token not available yet.");
      return;
    }

    if (loading) return;

    const { patientName, doctorName, date, time, duration } = form;

    if (!patientName || !doctorName || !date || !time || !duration) {
      Alert.alert("Missing Info", "Please fill in all fields to schedule the appointment.");
      return;
    }
    try {
      setLoading(true);

      await dispatch(
        addAppointment({
          appointment: { ...form, duration: parseInt(duration, 10), status: "Scheduled", note: "" },
          token: userToken,
        })
      ).unwrap();
      Alert.alert("Success", "Appointment added successfully!");
      navigation.goBack();

    } catch (error: any) {
      Alert.alert("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={STYLE.dashContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={STYLE.scrollContent}>
          <Navbar
            onLogout={() => dispatch(logout())}
            onLogoPress={handleLogoPress}
          />
          <View style={STYLE.padding_20}>
            <Text style={STYLE.headerTitle}>New Appointment</Text>
            <Text style={STYLE.headerSubtitle}>Fill in the details to schedule an appointment</Text>
          </View>

          <View style={STYLE.formContainer}>
            <FormInput
              label="Patient Name"
              value={form.patientName}
              onChange={(text) => setForm({ ...form, patientName: text })}
              placeholder="Full Name"
            />
            <FormInput
              label="Doctor Name"
              value={form.doctorName}
              onChange={(text) => setForm({ ...form, doctorName: text })}
              placeholder="Dr. Name"
            />

            <View style={STYLE.rowSpaceBetween}>
              <View style={STYLE.dateView}>
                <DateInput form={form} setForm={setForm} />
              </View>

              <View style={STYLE.timeView}>
                <TimePickerInput
                  label="Time"
                  value={form.time}
                  onChange={(time) => setForm({ ...form, time })}
                />
              </View>
            </View>

            <FormInput
              label="Duration"
              value={form.duration}
              onChange={(text) => setForm({ ...form, duration: text })}
              placeholder="e.g. 30 (minutes)"
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSubmit}
              disabled={loading}
              style={[STYLE.button, loading && STYLE.buttonDisabled]}
            >
              {loading && (
                <ActivityIndicator
                  color={COLORS.surface}
                  size="small"
                />
              )}
              <Text style={STYLE.buttonText}>Confirm Appointment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
