import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, STYLE } from "../utils/constants";

interface Props {
    label?: string;
    value: string;
    onChange: (time: string) => void;
}

const TimePickerInput: React.FC<Props> = ({
    label = "Time",
    value,
    onChange,
}) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <View style={STYLE.marginBottom_16}>
            <Text style={STYLE.formLabel}>{label}<Text style={{ color: COLORS.error }}> *</Text></Text>

            <TouchableOpacity
                style={[STYLE.formInput, STYLE.centerRow_8]}
                onPress={() => setShowPicker(true)}
            >
                <Ionicons name="time-outline" size={17} color={COLORS.primary} />
                <Text style={{ color: value ? COLORS.text.main : COLORS.text.muted }}>
                    {value ? value : "Select Time"}
                </Text>
            </TouchableOpacity>

            {showPicker && (
                <Modal visible={showPicker} transparent animationType="slide">
                    <View style={STYLE.modalBackground}>
                        <View style={STYLE.timeModalContent}>
                            <TouchableOpacity
                                onPress={() => setShowPicker(false)}
                                style={STYLE.closeIcon}
                            >
                                <Ionicons name="close" size={18} color={COLORS.primary} />
                            </TouchableOpacity>
                            <DateTimePicker
                                value={selectedTime}
                                mode="time"
                                is24Hour={true}
                                display="spinner"
                                textColor={COLORS.primary}
                                onChange={(event, date) => {
                                    if (date) {
                                        setSelectedTime(date);
                                        const formatted = formatTime(date);
                                        onChange(formatted);
                                    }
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            )
            }
        </View >
    );
};

export default TimePickerInput;
