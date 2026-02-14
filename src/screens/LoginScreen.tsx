import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/slices/authSlice";
import { AppDispatch, RootState } from "../services/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, STYLE } from "../utils/constants";
import { validateEmail, validatePassword } from "../utils/validation";

export default function LoginScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigation.replace("Dashboard");
    }
  }, [user]);

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");
    setGlobalError("");

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    if (emailErr || passwordErr) {
      setEmailError(emailErr);
      setPasswordError(passwordErr);
      return;
    }

    dispatch(login({ email, password }))
      .unwrap()
      .catch((err: any) => {
        if (err.code === "auth/user-not-found") {
          setGlobalError("Email incorrect or not found.");
        } else if (err.code === "auth/wrong-password") {
          setGlobalError("Password incorrect.");
        } else { setGlobalError(err || "Error during login"); }
      });
  };

  return (
    <SafeAreaView style={STYLE.dashContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={STYLE.inner}
      >
        <View style={STYLE.logoContainer}>
          <Image
            source={require("../../assets/informatechIcon.png")}
            style={STYLE.logo}
            resizeMode="contain"
          />
          <Text style={STYLE.subtitle}>Medical Appointment Management</Text>
        </View>

        <View style={STYLE.formCard}>
          <Text style={STYLE.title}>Welcome Back</Text>

          {globalError && (
            <View style={STYLE.globalErrorContainer}>
              <Ionicons name="alert-circle-outline" size={15} color={COLORS.error} style={STYLE.marginRight_6} />
              <Text style={STYLE.globalError}>{globalError}</Text>
            </View>
          )}

          <View style={STYLE.inputContainer}>
            <Text style={STYLE.label}>Email Address<Text style={{ color: COLORS.error }}> *</Text></Text>
            <TextInput
              placeholder="name@example.com"
              value={email}
              onChangeText={(text) => { setEmail(text); setEmailError(""); setGlobalError(""); }}
              style={[STYLE.input, emailError && STYLE.inputError]}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {emailError && <Text style={STYLE.loginErrorText}>{emailError}</Text>}
          </View>

          <View style={STYLE.inputContainer}>
            <Text style={STYLE.label}>Password<Text style={{ color: COLORS.error }}> *</Text></Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                placeholder="••••••••"
                value={password}
                onChangeText={(text) => { setPassword(text); setPasswordError(""); setGlobalError(""); }}
                style={[STYLE.input, passwordError && STYLE.inputError]}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={STYLE.passwordEye}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={18}
                  color={passwordError ? COLORS.error : COLORS.icon.disabled}
                />
              </TouchableOpacity>
            </View>
            {passwordError && <Text style={STYLE.loginErrorText}>{passwordError}</Text>}
          </View>

          <TouchableOpacity
            style={[STYLE.button, loading && STYLE.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading && (
              <ActivityIndicator
                color={COLORS.surface}
                size="small"
              />
            )}
            <Text style={STYLE.buttonText}>Sign In</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
