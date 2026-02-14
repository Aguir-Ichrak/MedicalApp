import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, STYLE } from "../utils/constants";
import { StatusType, AppointmentForm } from "../utils/types";

interface StatusOptionProps {
  value: StatusType;
  form: AppointmentForm;
  setForm: React.Dispatch<React.SetStateAction<AppointmentForm>>;
}

const StatusOption: React.FC<StatusOptionProps> = ({ value, form, setForm }) => {
  return (
    <TouchableOpacity
      onPress={() => setForm(prev => ({ ...prev, status: value }))}
      style={STYLE.statusRow}
    >
      <Ionicons
        name={form.status === value ? "checkbox" : "square-outline"}
        size={22}
        color={COLORS.primary}
      />
      <Text style={STYLE.statusText}>{value}</Text>
    </TouchableOpacity>
  );
};

export default StatusOption;
