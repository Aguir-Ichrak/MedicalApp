import React from "react";
import {
    View,
    TouchableOpacity,
    Image,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, STYLE } from "../utils/constants";

interface NavbarProps {
    onLogout: () => void;
    onLogoPress: () => void;
}

export const Navbar = ({ onLogout, onLogoPress }: NavbarProps) => {
    return (
        <View style={STYLE.navHeader}>
            <TouchableOpacity onPress={onLogoPress}>
                <Image
                    source={require("../../assets/informatechLogo.png")}
                    style={STYLE.navLogo}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={onLogout}>
                <Ionicons
                    name="exit-outline"
                    size={18}
                    color={COLORS.error}
                />
            </TouchableOpacity>            
        </View>
    );
};
