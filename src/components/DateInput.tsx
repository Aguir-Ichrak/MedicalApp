import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import { COLORS, minDate, STYLE } from "../utils/constants";
import { AppointmentForm } from "../utils/types";
import { Ionicons } from "@expo/vector-icons";

interface CalendarInputProps {
  form: AppointmentForm;
  setForm: React.Dispatch<React.SetStateAction<AppointmentForm>>;
}

const DateInput: React.FC<CalendarInputProps> = ({ form, setForm }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleDayPress = (day: { dateString: string }) => {
        setForm(prev => ({ ...prev, date: day.dateString }));
        setModalVisible(false);
    };

    return (
        <View style={STYLE.marginBottom_16}>
            <Text style={STYLE.formLabel}>Date<Text style={{ color: COLORS.error }}> *</Text></Text>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[STYLE.formInput, STYLE.centerRow_8]}
            >
                <Ionicons name="calendar-outline" size={17} color={COLORS.primary} />
                <Text style={{ color: form.date ? COLORS.text.main : COLORS.text.muted }}>
                    {form.date || "Select Date"}
                </Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={STYLE.modalBackground}>
                    <View style={STYLE.modalContent}>
                        <Calendar
                            onDayPress={handleDayPress}
                            minDate={minDate}
                            markedDates={{
                                [form.date]: { selected: true, selectedColor: COLORS.secondary},
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={STYLE.closeButton}
                        >
                            <Text style={{ color: COLORS.surface }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default DateInput;