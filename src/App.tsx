import React from "react";
import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { RootState, store } from "./services/store";
import AppNavigator from "./navigation/AppNavigator";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";

const RootApp: React.FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (!user) return <LoginScreen />;
  if (loading) return <LoadingScreen />;

  return <AppNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootApp />
      </NavigationContainer>
    </Provider>
  );
}
