import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { COLORS } from "../utils/constants";
import { RootStackParamList } from "../utils/types";
import { RootState } from "../services/store";

// Screens
import DashboardScreen from "../screens/DashboardScreen";
import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen";
import AddAppointmentScreen from "../screens/AddAppointmentScreen";
import EditAppointmentScreen from "../screens/EditAppointmentScreen";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.surface,
        headerTitleStyle: { fontWeight: "bold" },
        headerShown: true,
        title: "Informatech - Medical Appointment Management",
      }}
    >
      {!user ? (
        // User not logged in
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        // User logged in
        <>
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddAppointment"
            component={AddAppointmentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditAppointment"
            component={EditAppointmentScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
