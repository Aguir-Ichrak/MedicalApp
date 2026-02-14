import React from "react";
import { View, ActivityIndicator } from "react-native";
import { COLORS, STYLE } from "../utils/constants";

const LoadingScreen: React.FC = () => {
  return (
    <View style={STYLE.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default LoadingScreen;
