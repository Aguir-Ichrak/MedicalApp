import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../services/store";
import {
    getAppointmentById,
    updateAppointment,
} from "../services/slices/appointmentsSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormInput } from "../components/FormInput";
import { COLORS, STYLE } from "../utils/constants";
import { getAuth } from "firebase/auth";
import DateInput from "../components/DateInput";
import TimePickerInput from "../components/TimePickerInput";
import { Navbar } from "../components/Navbar";
import { logout } from "../services/slices/authSlice";
import { AppointmentForm, statusOptions } from "../utils/types";
import StatusOption from "../components/StatusOption";
import LoadingScreen from "./LoadingScreen";

interface RouteParams {
    appointmentId: string;
}

export default function EditAppointmentScreen({ navigation, route }: any) {
    const { appointmentId } = route.params as RouteParams;
    const dispatch = useDispatch<AppDispatch>();

    const appointment = useSelector(
        (state: RootState) => state.appointments.selectedAppointment
    );

    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const appointmentLoading = useSelector((state: RootState) => state.appointments.loading);

    useEffect(() => {
        const fetchToken = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                Alert.alert("Error", "User not logged in");
                navigation.goBack();
                return;
            }

            const token = await user.getIdToken();
            setUserToken(token);
        };

        fetchToken();
    }, []);

    useEffect(() => {
        const fetchAppointment = async () => {
            if (!userToken) return;

            try {
                setLoading(true);

                await dispatch(
                    getAppointmentById({
                        id: appointmentId,
                        token: userToken,
                    })
                ).unwrap();

            } catch (error: any) {
                Alert.alert("Error", error);
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [userToken, appointmentId]);

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
        if (appointment) {
            setForm({
                patientName: appointment.patientName,
                doctorName: appointment.doctorName,
                date: appointment.date,
                time: appointment.time,
                duration: String(appointment.duration),
                status: appointment.status,
                note: appointment.note || "",
            });
        }
    }, [appointment]);

    const handleSubmit = async () => {
        if (!userToken || !appointment) return;
        if (loading) return;

        const { patientName, doctorName, date, time, duration } = form;
        if (!patientName || !doctorName || !date || !time || !duration) {
            Alert.alert("Missing Info", "Please fill all required fields.");
            return;
        }

        try {
            setLoading(true);
            await dispatch(
                updateAppointment({
                    id: appointment.id,
                    appointment: { ...form, duration: parseInt(duration, 10) },
                    token: userToken,
                })
            ).unwrap();

            Alert.alert("Success", "Appointment updated successfully!");
            navigation.goBack();
        } catch (err: any) {
            Alert.alert("Error", err || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (appointmentLoading || !appointment) {
        return (
            <SafeAreaView style={STYLE.dashContainer}>
                <Navbar onLogout={() => dispatch(logout())} onLogoPress={() => navigation.navigate("Dashboard")} />
                <LoadingScreen />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={STYLE.dashContainer}>
            <Navbar onLogout={() => dispatch(logout())} onLogoPress={() => navigation.navigate("Dashboard")} />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView contentContainerStyle={STYLE.scrollContent}>
                    <View style={STYLE.padding_20}>
                        <Text style={STYLE.headerTitle}>Edit Appointment</Text>
                        <Text style={STYLE.headerSubtitle}>Update appointment details</Text>
                    </View>

                    <View style={STYLE.formContainer}>
                        <FormInput
                            label="Patient Name"
                            value={form.patientName}
                            onChange={(text) => setForm({ ...form, patientName: text })}
                        />
                        <FormInput
                            label="Doctor Name"
                            value={form.doctorName}
                            onChange={(text) => setForm({ ...form, doctorName: text })}
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
                            placeholder="Minutes"
                        />
                        <View style={STYLE.marginBottom_16}>
                            <Text style={STYLE.formLabel}>Status</Text>
                            {statusOptions.map((status) => (
                                <StatusOption
                                    key={status}
                                    value={status}
                                    form={form}
                                    setForm={setForm}
                                />
                            ))}
                        </View>
                        <View style={STYLE.marginBottom_16}>
                            <Text style={STYLE.formLabel}>Note</Text>
                            <TextInput
                                multiline
                                numberOfLines={4}
                                value={form.note}
                                onChangeText={(text) => setForm({ ...form, note: text })}
                                style={STYLE.noteInput}
                                placeholder="Add additional notes..."
                            />
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit} disabled={loading} style={[STYLE.button, loading && STYLE.buttonDisabled]}>
                            {loading && (
                                <ActivityIndicator
                                    color={COLORS.surface}
                                    size="small"
                                />
                            )}
                            <Text style={STYLE.buttonText}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

