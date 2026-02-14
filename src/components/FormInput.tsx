import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { COLORS, STYLE } from "../utils/constants";

interface FormInputProps {
    label: string;
    value: string;
    onChange: (text: string) => void;
    placeholder?: string;
    keyboardType?: TextInputProps["keyboardType"];
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    value,
    onChange,
    placeholder = "",
    keyboardType = "default",
}) => {
    return (
        <View style={STYLE.marginBottom_16}>
            <Text style={STYLE.formLabel}>{label}<Text style={{ color: COLORS.error }}> *</Text></Text>
            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={COLORS.text.muted}
                keyboardType={keyboardType}
                style={STYLE.formInput}
            />
        </View>
    );
};